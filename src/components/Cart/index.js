import {Component} from 'react'

import Navbar from '../Navbar'

import Footer from '../Footer'

import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import OrderSuccess from '../OrderSuccess'
import './index.css'

class Cart extends Component {
  state = {cartList: [], isPlaceOrderClicked: false}

  getOldCartList = () => {
    const stringifiedCartList = localStorage.getItem('cartData')
    const parsedCartList = JSON.parse(stringifiedCartList)
    if (parsedCartList === null) {
      return []
    }
    return parsedCartList
  }

  componentDidMount = () => {
    const oldCartList = this.getOldCartList()
    this.setState({cartList: oldCartList})
  }

  updateLocalStorage = () => {
    console.log('update')
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  onClickIncrementCartItemQuantity = cartItemId => {
    console.log('increment')
    const {cartList} = this.state

    const incrementFoodItemObject = cartList.find(
      eachCartItem => eachCartItem.id === cartItemId,
    )
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (incrementFoodItemObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }),
      this.updateLocalStorage,
    )
  }

  onClickDecrementCartItemQuantity = cartItemId => {
    const {cartList} = this.state

    const decrementFoodItemObject = cartList.find(
      eachCartItem => eachCartItem.id === cartItemId,
    )
    if (decrementFoodItemObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (decrementFoodItemObject === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(cartItemId)
    }
  }

  removeCartItem = cartItemId => {
    const {cartList} = this.state

    const deleteFoodItemObject = cartList.find(
      eachCartItem => eachCartItem.id === cartItemId,
    )
    const updatedCartList = cartList.filter(
      each => each.id !== deleteFoodItemObject.id,
    )
    console.log(updatedCartList)
    this.setState({cartList: updatedCartList}, this.updateLocalStorage)
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  onClickPlaceOrder = () => {
    this.setState({isPlaceOrderClicked: true})
  }

  renderCartView = () => {
    const {cartList} = this.state
    const showEmptyView = cartList.length === 0

    return (
      <>
        <Navbar />
        <div className="cart-container">
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-content-container">
              <CartListView
                cartList={cartList}
                onClickIncrementCartItemQuantity={
                  this.onClickIncrementCartItemQuantity
                }
                onClickDecrementCartItemQuantity={
                  this.onClickDecrementCartItemQuantity
                }
              />
              <CartSummary
                onClickPlaceOrder={this.onClickPlaceOrder}
                cartList={cartList}
              />
            </div>
          )}
        </div>
        <Footer />
      </>
    )
  }

  renderPlaceOrderView = () => (
    <>
      <Navbar />
      <OrderSuccess />
    </>
  )

  renderCartPage = () => {
    const {isPlaceOrderClicked} = this.state
    return isPlaceOrderClicked
      ? this.renderPlaceOrderView()
      : this.renderCartView()
  }

  render() {
    return this.renderCartPage()
  }
}

export default Cart
