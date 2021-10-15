import CartContext from '../../context/CartContext'
import Counter from '../Counter'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {cartItemDetails} = props
      const {name, cost, imageUrl, id, quantity} = cartItemDetails

      const totalPrice = cost * quantity

      return (
        <li className="cart-item">
          <div className="cart-item-description">
            <img className="cart-product-image" src={imageUrl} alt={name} />

            <h1 className="cart-product-title-md">{name}</h1>
          </div>
          <div className="cart-name-price">
            <p className="cart-product-title-sm">{name}</p>
            <Counter quantity={quantity} foodItemId={id} />

            <p className="cart-total-price">Rs {totalPrice}/-</p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
