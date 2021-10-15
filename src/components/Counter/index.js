import CartContext from '../../context/CartContext'

import './index.css'

const Counter = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {quantity, foodItemId} = props

      const onClickDecrement = () => {
        decrementCartItemQuantity(foodItemId)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(foodItemId)
      }

      return (
        <div className="counter-container">
          <button
            type="button"
            onClick={onClickDecrement}
            className="button-control"
            testid="decrement-quantity"
          >
            -
          </button>
          <p className="quantity-control" testid="item-quantity">
            {quantity}
          </p>
          <button
            type="button"
            onClick={onClickIncrement}
            className="button-control"
            testid="increment-quantity"
          >
            +
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Counter
