import CartItem from '../CartItem'

import './index.css'

const CartListView = props => {
  const {
    cartList,
    onClickIncrementCartItemQuantity,
    onClickDecrementCartItemQuantity,
    removeCartItem,
  } = props
  return (
    <div className="cart-list">
      <div className="cart-categories-heading">
        <p className="cart-heading">Item</p>
        <p className="cart-heading">Quantity</p>
        <p className="cart-heading">Price</p>
      </div>
      <ul className="cart-list-items">
        {cartList.map(eachCartItem => (
          <li key={eachCartItem.id}>
            <CartItem
              foodItemDetails={eachCartItem}
              onClickIncrementCartItemQuantity={
                onClickIncrementCartItemQuantity
              }
              onClickDecrementCartItemQuantity={
                onClickDecrementCartItemQuantity
              }
              removeCartItem={removeCartItem}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartListView
