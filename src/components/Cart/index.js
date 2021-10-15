import {Component} from 'react'

import Navbar from '../Navbar'
import CartContext from '../../context/CartContext'
import Footer from '../Footer'

import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import OrderSuccess from '../OrderSuccess'
import './index.css'

class Cart extends Component {
  state = {isPlaceOrderClicked: false}

  onClickPlaceOrder = () => {
    this.setState({isPlaceOrderClicked: true})
  }

  renderCartView = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const showEmptyView = cartList.length === 0

        return (
          <>
            <Navbar />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <CartListView />
                  <CartSummary onClickPlaceOrder={this.onClickPlaceOrder} />
                </div>
              )}
            </div>
            <Footer />
          </>
        )
      }}
    </CartContext.Consumer>
  )

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
