import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartSummary = props => {
  const {cartList, onClickPlaceOrder} = props

  const onClickPlace = () => {
    onClickPlaceOrder()
  }

  const getTotalPrice = () => {
    console.log(67899)
    let total = 0
    cartList.map(each => {
      total += each.quantity * each.cost
      return total
    })
    return total
  }

  return (
    <div className="cart-summary-container">
      <hr className="cart-line-separation" />
      <div className="cart-summary">
        <h1 className="order-heading">Order Total:</h1>
        <p className="price" testid="total-price">
          <BiRupee /> {getTotalPrice()}/-{' '}
        </p>
      </div>
      <button
        className="place-order-button"
        type="button"
        onClick={onClickPlace}
      >
        Place Order
      </button>
    </div>
  )
}

export default CartSummary
