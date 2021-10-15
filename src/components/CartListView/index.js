import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list">
          <li className="cart-categories-heading">
            <h1 className="cart-heading">Item</h1>
            <h1 className="cart-heading">Quantity</h1>
            <h1 className="cart-heading">Price</h1>
          </li>
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
