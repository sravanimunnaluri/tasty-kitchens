import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = props => {
  const {onClickPlaceOrder} = props

  const onClickPlace = () => {
    onClickPlaceOrder()
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.map(each => {
          total += each.quantity * each.cost
          return total
        })
        return (
          <div className="cart-summary-container">
            <hr className="cart-line-separation" />
            <div className="cart-summary">
              <h1 className="order-heading">Order Total:</h1>
              <h1 className="price" testid="total-price">
                <BiRupee className="rupee" /> {total}/-{' '}
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
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
