import {Component} from 'react'
import './index.css'

class Counter extends Component {
  state = {newQuantity: ''}

  componentDidMount = () => {
    const {foodItemDetails} = this.props
    const {quantity} = foodItemDetails
    this.setState({newQuantity: quantity})
  }

  onClickIncrement = () => {
    const {onClickIncrementCartItemQuantity, foodItemDetails} = this.props
    this.setState(
      prevState => ({newQuantity: prevState.newQuantity + 1}),
      onClickIncrementCartItemQuantity(foodItemDetails.id),
    )
  }

  onClickDecrement = () => {
    const {onClickDecrementCartItemQuantity, foodItemDetails} = this.props
    const {newQuantity} = this.state
    if (newQuantity > 1) {
      this.setState(
        prevState => ({newQuantity: prevState.newQuantity - 1}),
        onClickDecrementCartItemQuantity(foodItemDetails.id),
      )
    } else {
      this.removeCartItemDetails()
    }
  }

  removeCartItemDetails = () => {
    const {removeCartItem, foodItemDetails} = this.props
    removeCartItem(foodItemDetails.id)
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
