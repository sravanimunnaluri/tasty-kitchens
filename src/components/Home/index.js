import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'

import Footer from '../Footer'

import ReactSlick from '../ReactSlick'
import Navbar from '../Navbar'
import PopularRestaurantsHeader from '../PopularRestaurantsHeader'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    offersList: [],
    apiStatusOffers: apiStatusConstants.initial,
    apiStatusRestaurants: apiStatusConstants.initial,
    restaurantsList: [],
    activePageNumber: 1,
    noOfPages: 0,
    activeOptionId: 'Lowest',
  }

  onClickNextPage = () => {
    const {activePageNumber, noOfPages} = this.state

    if (activePageNumber !== noOfPages) {
      this.setState(
        prevState => ({
          activePageNumber: prevState.activePageNumber + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onClickPreviousPage = () => {
    const {activePageNumber} = this.state
    if (activePageNumber > 1) {
      this.setState(
        prevState => ({
          activePageNumber: prevState.activePageNumber - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  Pagination = () => {
    const {activePageNumber, noOfPages} = this.state

    return (
      <div className="pagination-container">
        <button
          type="button"
          className="pagination-button"
          onClick={this.onClickPreviousPage}
          testid="pagination-left-button"
        >
          <AiOutlineLeftSquare className="arrow-icon" />
        </button>
        <p className="page-number" testid="active-page-number">
          {activePageNumber}
        </p>
        <span className="page-number"> of {noOfPages}</span>
        <button
          type="button"
          className="pagination-button"
          onClick={this.onClickNextPage}
          testid="pagination-right-button"
        >
          <AiOutlineRightSquare className="arrow-icon" />
        </button>
      </div>
    )
  }

  getOffersCarrousel = async () => {
    this.setState({apiStatusOffers: apiStatusConstants.inprogress})
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setState({
        offersList: fetchedData.offers,
        apiStatusOffers: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusOffers: apiStatusConstants.failure})
    }
  }

  getNumberOfRestaurants = async () => {
    const apiUrl = 'https://apis.ccbp.in/restaurants-list'

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const number = Math.round(data.total / 9) + 1

      console.log(data)
      this.setState({noOfPages: number})
    }
  }

  onChangeSortByOption = value => {
    this.setState({activeOptionId: value}, this.getRestaurantsList)
  }

  getRestaurantsList = async () => {
    this.setState({apiStatusRestaurants: apiStatusConstants.inprogress})
    const {activeOptionId} = this.state

    const selectedSortByValue = activeOptionId
    console.log(selectedSortByValue)
    const {activePageNumber} = this.state
    console.log(activePageNumber)
    const LIMIT = 9
    const OFFSET = (activePageNumber - 1) * LIMIT

    const apiUrl = `https://apis.ccbp.in/restaurants-list?&sort_by_rating=${selectedSortByValue}&offset=${OFFSET}&limit=${LIMIT}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachRestaurant => ({
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        userRating: eachRestaurant.user_rating,
        name: eachRestaurant.name,
        hasTableBooking: eachRestaurant.has_table_booking,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        imageUrl: eachRestaurant.image_url,
        id: eachRestaurant.id,
        menuType: eachRestaurant.menu_type,
        location: eachRestaurant.location,
        opensAt: eachRestaurant.opens_at,
        groupByTime: eachRestaurant.group_by_time,
      }))
      this.setState({
        apiStatusRestaurants: apiStatusConstants.success,
        restaurantsList: updatedData,
      })
    } else {
      this.setState({apiStatusRestaurants: apiStatusConstants.failure})
    }
  }

  componentDidMount = () => {
    this.getOffersCarrousel()
    this.getRestaurantsList()
    this.getNumberOfRestaurants()
  }

  renderRestaurantsSuccessView = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list-container">
        {restaurantsList.map(eachRestaurant => (
          <RestaurantCard
            key={eachRestaurant.id}
            restaurantDetails={eachRestaurant}
            testid="restaurant-item"
          />
        ))}
      </ul>
    )
  }

  renderRestaurantsLoadingView = () => (
    <div className="products-loader-container" testid="restaurants-list-loader">
      <Loader
        type="Circles"
        color="#F7931E"
        height="50"
        width="50"
        testid="restaurants-list-loader"
      />
    </div>
  )

  renderRestaurantsFailureView = () => (
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

  renderRestaurantView = () => {
    const {apiStatusRestaurants} = this.state
    switch (apiStatusRestaurants) {
      case apiStatusConstants.success:
        return this.renderRestaurantsSuccessView()
      case apiStatusConstants.failure:
        return this.renderRestaurantsFailureView()
      case apiStatusConstants.inprogress:
        return this.renderRestaurantsLoadingView()
      default:
        return null
    }
  }

  renderRestaurantsOffersSuccessView = () => {
    const {offersList} = this.state
    return (
      <ul>
        <ReactSlick offersList={offersList} key={offersList.id} />
      </ul>
    )
  }

  renderRestaurantsOffersLoaderView = () => (
    <div
      className="restaurants-loader-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="Circles" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantsOffersFailureView = () => (
    <div>
      <h1>offers not found</h1>
      <img
        src="./img/NotFound.png"
        alt="not found"
        className="notfound-image"
      />
    </div>
  )

  renderRestaurantOffersView = () => {
    const {apiStatusOffers} = this.state
    switch (apiStatusOffers) {
      case apiStatusConstants.success:
        return this.renderRestaurantsOffersSuccessView()
      case apiStatusConstants.failure:
        return this.renderRestaurantsOffersFailureView()
      case apiStatusConstants.inprogress:
        return this.renderRestaurantsOffersLoaderView()
      default:
        return null
    }
  }

  render() {
    const {sortByOptions} = this.props
    const {restaurantsList, activeOptionId} = this.state
    console.log(restaurantsList)
    return (
      <>
        <Navbar />

        <div className="home-container">
          <PopularRestaurantsHeader
            sortByOptions={sortByOptions}
            onChangeSortByOption={this.onChangeSortByOption}
            activeOptionId={activeOptionId}
          />
          {this.renderRestaurantOffersView()}
          {this.renderRestaurantView()}

          <this.Pagination />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
