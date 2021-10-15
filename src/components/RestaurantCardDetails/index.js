import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar, AiOutlinePlus} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'

import Footer from '../Footer'

import Navbar from '../Navbar'

import FoodItemCard from '../FoodItemCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantCardDetails extends Component {
  state = {
    itemsList: {},
    foodItemsList: [],
    apiStatusRestaurantDetails: apiStatusConstants.initial,
  }

  getItemsFromRestaurant = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({apiStatusRestaurantDetails: apiStatusConstants.inprogress})

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        rating: fetchedData.rating,
        id: fetchedData.id,
        name: fetchedData.name,
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        imageUrl: fetchedData.image_url,
        reviewsCount: fetchedData.reviews_count,
        opensAt: fetchedData.opensAt,
        location: fetchedData.location,
        itemsCount: fetchedData.items_count,
        foodItems: fetchedData.food_items.map(each => ({
          name: each.name,
          cost: each.cost,
          foodType: each.food_type,
          imageUrl: each.image_url,
          id: each.id,
        })),
      }

      this.setState({
        apiStatusRestaurantDetails: apiStatusConstants.success,
        itemsList: updatedData,
        foodItemsList: updatedData.foodItems,
      })
    } else {
      this.setState({apiStatusRestaurantDetails: apiStatusConstants.failure})
    }
  }

  componentDidMount = () => {
    this.getItemsFromRestaurant()
  }

  renderSuccessView = () => {
    const {itemsList, foodItemsList} = this.state

    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = itemsList

    return (
      <div className="restaurant-details-page">
        <Navbar />
        <div className="restaurant-specific-details">
          <img src={imageUrl} alt="food item" className="special-dish-image" />
          <div className="special-dish">
            <h1 className="restaurant-title">{name}</h1>
            <p className=" restaurant-details">{cuisine}</p>
            <p className=" restaurant-details">{location}</p>
            <div className="ratings-cost-container">
              <div className="ratings-container">
                <p className="rating-details">
                  <AiFillStar className="white-star" /> {rating}
                </p>
                <p className="rating-details">
                  {reviewsCount} <AiOutlinePlus /> Ratings
                </p>
              </div>
              <hr className="line-separation" />
              <div className="price-container">
                <p className="rating-details">
                  {' '}
                  <BiRupee className="white-star" /> {costForTwo}
                </p>
                <p className="rating-details">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Restaurant-dishes">
          <ul className="dishes-list-container ">
            {foodItemsList.map(each => (
              <FoodItemCard
                key={each.id}
                FoodItemData={each}
                rating={rating}
                testid="fooditem"
              />
            ))}
          </ul>
        </div>

        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="not-found-page">
      <img
        src="./img/NotFound.png"
        alt="not found"
        className="notfound-image"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-subheading">
        We are sorry the page you requested could not be found
        <br /> please go back to the home page
      </p>
      <Link to="/">
        <button className="home-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  )

  renderRestaurantDetailsView() {
    const {apiStatusRestaurantDetails} = this.state
    switch (apiStatusRestaurantDetails) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderRestaurantDetailsView()}</div>
  }
}

export default RestaurantCardDetails
