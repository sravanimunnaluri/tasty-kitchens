import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartSummary = props => {
  const {onClickPlaceOrder, cartList} = props

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
        <h className="order-heading">Order Total:</h>
        <h1 className="price" testid="total-price">
          {getTotalPrice()}/-{' '}
        </h1>
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
