import {Component} from 'react'
import './index.css'

class Counter extends Component {
  state = {newQuantity: ''}

  componentDidMount = () => {
    const {quantity} = this.props
    this.setState({newQuantity: quantity})
  }

  onClickIncrement = () => {
    const {onClickIncrementCartItemQuantity, cartItemId} = this.props
    this.setState(
      prevState => ({newQuantity: prevState.newQuantity + 1}),
      onClickIncrementCartItemQuantity(cartItemId),
    )
  }

  onClickDecrement = () => {
    const {onClickDecrementCartItemQuantity, cartItemId} = this.props
    const {newQuantity} = this.state
    if (newQuantity > 1) {
      this.setState(
        prevState => ({newQuantity: prevState.newQuantity - 1}),
        onClickDecrementCartItemQuantity(cartItemId),
      )
    } else {
      this.removeCartItemDetails()
    }
  }

  removeCartItemDetails = () => {
    const {removeCartItem, cartItemId} = this.props
    removeCartItem(cartItemId)
  }

  render() {
    const {newQuantity} = this.state
    return (
      <div className="counter-container">
        <button
          type="button"
          onClick={this.onClickDecrement}
          className="button-control"
          testid="decrement-quantity"
        >
          -
        </button>
        <p className="quantity-control" testid="item-quantity">
          {newQuantity}
        </p>
        <button
          type="button"
          onClick={this.onClickIncrement}
          className="button-control"
          testid="increment-quantity"
        >
          +
        </button>
      </div>
    )
  }
}
export default Counter
