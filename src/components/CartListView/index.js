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
      <ul>
        {cartList.map(eachCartItem => (
          <CartItem
            key={eachCartItem.id}
            cartItemDetails={eachCartItem}
            onClickIncrementCartItemQuantity={onClickIncrementCartItemQuantity}
            onClickDecrementCartItemQuantity={onClickDecrementCartItemQuantity}
            removeCartItem={removeCartItem}
          />
        ))}
      </ul>
    </div>
  )
}

export default CartListView
