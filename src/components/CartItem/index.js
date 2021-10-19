import Counter from '../Counter'

import './index.css'

const CartItem = props => {
  const {
    cartItemDetails,
    onClickDecrementCartItemQuantity,
    onClickIncrementCartItemQuantity,
    removeCartItem,
  } = props

  const {name, cost, imageUrl, id, quantity} = cartItemDetails

  const totalPrice = cost * quantity

  return (
    <li className="cart-item">
      <div className="cart-item-description">
        <img className="cart-product-image" src={imageUrl} alt={name} />

        <h1 className="cart-product-title-md cart-product-title">{name}</h1>
      </div>
      <div className="cart-name-price">
        <h1 className="cart-product-title-sm cart-product-title">{name}</h1>
        <Counter
          cartItemId={id}
          quantity={quantity}
          onClickDecrementCartItemQuantity={onClickDecrementCartItemQuantity}
          onClickIncrementCartItemQuantity={onClickIncrementCartItemQuantity}
          removeCartItem={removeCartItem}
        />

        <p className="cart-total-price" testid="total-price">
          Rs {totalPrice}/-
        </p>
      </div>
    </li>
  )
}

export default CartItem
