import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import Cart from './components/Cart'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import RestaurantCardDetails from './components/RestaurantCardDetails'
import CartContext from './context/CartContext'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {cartList: []}

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

  componentDidUpdate = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  incrementCartItemQuantity = FoodItemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === FoodItemId) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = FoodItemId => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === FoodItemId,
    )
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (FoodItemId === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(FoodItemId)
    }
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    const RestaurantFoodItemObject = cartList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )
    if (RestaurantFoodItemObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (RestaurantFoodItemObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + foodItem.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodItem]
      console.log(foodItem)
      this.setState({cartList: updatedCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute
              exact
              path="/"
              component={() => <Home sortByOptions={sortByOptions} />}
            />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantCardDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
