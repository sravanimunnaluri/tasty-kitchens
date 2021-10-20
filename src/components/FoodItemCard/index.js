import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {Component} from 'react'

import './index.css'

class FoodItemCard extends Component {
  state = {quantity: 0, isAddButtonClicked: false}

  onClickAddToCart = () => {
    const {addCartItem} = this.props
    const {FoodItemData} = this.props
    const quantity = 1

    this.setState(
      {isAddButtonClicked: true, quantity: 1},
      addCartItem({...FoodItemData, quantity}),
    )
  }

  onClickIncrementCount = () => {
    const {onIncrementCount} = this.props
    const {FoodItemData} = this.props
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      onIncrementCount(FoodItemData.id),
    )
  }

  onClickDecrementCount = () => {
    const {onDecrementCount, removeCartItem} = this.props
    const {FoodItemData} = this.props
    const {quantity} = this.state

    if (quantity > 1) {
      this.setState(
        prevState => ({
          quantity: prevState.quantity - 1,
        }),
        onDecrementCount(FoodItemData.id),
      )
    } else {
      this.setState(
        {
          isAddButtonClicked: false,
        },
        removeCartItem(FoodItemData.id),
      )
    }
  }

  renderAddCartItem = () => {
    const {isAddButtonClicked} = this.state
    const {quantity} = this.state
    return quantity > 0 && isAddButtonClicked ? (
      <div className="counter-container">
        <button
          type="button"
          onClick={this.onClickDecrementCount}
          className="button-control"
          testid="decrement-count"
        >
          -
        </button>
        <p className="quantity-control" testid="active-count">
          {quantity}
        </p>
        <button
          type="button"
          onClick={this.onClickIncrementCount}
          className="button-control"
          testid="increment-count"
        >
          +
        </button>
      </div>
    ) : (
      <button
        className="add-button"
        type="button"
        onClick={this.onClickAddToCart}
      >
        Add
      </button>
    )
  }

  renderFoodItemCard = () => {
    const {FoodItemData} = this.props

    const {name, cost, imageUrl, id, rating} = FoodItemData

    return (
      <li className="dish-details-card" key={id} testid="foodItem">
        <img src={imageUrl} alt="dish" className="dish-image" />
        <div className="dish-details">
          <h1 className="dish-name">{name}</h1>
          <p className="cost-details">
            {' '}
            <BiRupee className="rupee" /> {cost}
          </p>

          <p className="rating">
            <span>
              <AiFillStar className="yellow-star" />
            </span>
            {rating}
          </p>

          {this.renderAddCartItem()}
        </div>
      </li>
    )
  }

  render() {
    return this.renderFoodItemCard()
  }
}

export default FoodItemCard
