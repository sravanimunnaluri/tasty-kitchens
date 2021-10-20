import {BiRupee} from 'react-icons/bi'

import Counter from '../Counter'

import './index.css'

const CartItem = props => {
  const {
    foodItemDetails,
    onClickDecrementCartItemQuantity,
    onClickIncrementCartItemQuantity,
    removeCartItem,
  } = props
  console.log(foodItemDetails)

  const {name, cost, imageUrl, id, quantity} = foodItemDetails

  const totalPrice = cost * quantity

  return (
    <div className="cart-item">
      <div className="cart-item-description">
        <img className="cart-product-image" src={imageUrl} alt={name} />

        <h1 className="cart-product-title-md cart-product-title">{name}</h1>
      </div>
      <div className="cart-name-price">
        <h1 className="cart-product-title-sm cart-product-title">{name}</h1>
        <Counter
          foodItemDetails={foodItemDetails}
          onClickDecrementCartItemQuantity={onClickDecrementCartItemQuantity}
          onClickIncrementCartItemQuantity={onClickIncrementCartItemQuantity}
          removeCartItem={removeCartItem}
        />

        <p className="cart-total-price" testid="total-price">
          <BiRupee />
          {totalPrice}/-
        </p>
      </div>
    </div>
  )
}

export default CartItem
