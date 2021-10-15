import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props

  const {imageUrl, name, userRating, cuisine, id} = restaurantDetails
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-item">
      <li className="restaurant-card" testid="restaurant-item" key={id}>
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-item-details">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine-name">{cuisine}</p>
          <p className="rating-values">
            {' '}
            <AiFillStar className="yellow-star" />
            {userRating.rating}
          </p>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
