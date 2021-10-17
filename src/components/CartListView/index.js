import CartItem from '../CartItem'

import './index.css'

const CartListView = props => {
  const {
    cartList,
    onClickIncrementCartItemQuantity,
    onClickDecrementCartItemQuantity,
  } = props
  return (
    <ul className="cart-list">
      <li className="cart-categories-heading">
        <h1 className="cart-heading">Item</h1>
        <h1 className="cart-heading">Quantity</h1>
        <h1 className="cart-heading">Price</h1>
      </li>
      {cartList.map(eachCartItem => (
        <CartItem
          key={eachCartItem.id}
          cartItemDetails={eachCartItem}
          onClickIncrementCartItemQuantity={onClickIncrementCartItemQuantity}
          onClickDecrementCartItemQuantity={onClickDecrementCartItemQuantity}
        />
      ))}
    </ul>
  )
}

export default CartListView
