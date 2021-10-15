import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

class FoodItemCard extends Component {
  state = {quantity: 1, isAddButtonClicked: false}

  renderFoodItemCard = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {FoodItemData, rating} = this.props
        const {quantity, isAddButtonClicked} = this.state
        const {name, cost, imageUrl, id} = FoodItemData
        console.log(quantity)

        const onClickAddToCart = () => {
          addCartItem({...FoodItemData, quantity})
          this.setState({
            isAddButtonClicked: true,
          })
        }
        const onClickIncrementCount = () => {
          this.setState(
            prevState => ({quantity: prevState.quantity + 1}),
            onClickAddToCart,
          )
        }

        const onClickDecrementCount = () => {
          if (quantity > 1) {
            this.setState(
              prevState => ({quantity: prevState.quantity - 1}),
              onClickAddToCart,
            )
          }
        }

        const renderAddCartItem = () =>
          isAddButtonClicked ? (
            <div className="counter-container">
              <button
                type="button"
                onClick={onClickDecrementCount}
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
                onClick={onClickIncrementCount}
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
              onClick={onClickAddToCart}
            >
              Add
            </button>
          )

        return (
          <div className="dish-details-card">
            <img src={imageUrl} alt="dish" className="dish-image" />
            <div className="dish-details">
              <h1 className="dish-name">{name}</h1>
              <p className="cost-details">
                {' '}
                <BiRupee className="rupee" /> {cost}
              </p>
              <p className="rating">
                <AiFillStar className="yellow-star" /> {rating}
              </p>
              {renderAddCartItem()}
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderFoodItemCard()
  }
}

/*  const FoodItemCard = props => (
  <CartContext.Consumer>
    {value => {
      const {addCartItem} = value
      const {FoodItemData, rating} = props
      const {name, cost, foodType, imageUrl, id} = FoodItemData

      const onClickAddToCart = () => {
        addCartItem({...FoodItemData, quantity})
      }

      return (
        <div className="dish-details-card">
          <img src={imageUrl} alt="dish" className="dish-image" />
          <div className="dish-details">
            <h1 className="dish-name">{name}</h1>
            <p className="cost-details">
              {' '}
              <BiRupee className="rupee" /> {cost}
            </p>
            <p className="rating">
              <AiFillStar className="yellow-star" /> {rating}
            </p>
            <button className="add-button" type="button" onClick={onClickAdd}>
              Add
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)   */

export default FoodItemCard
