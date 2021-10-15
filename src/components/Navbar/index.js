import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
import './index.css'

class Navbar extends Component {
  state = {isActiveRouteHome: true, showHamburgerMenu: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickCartRoute = () => {
    this.setState({isActiveRouteHome: false})
  }

  onClickHomeRoute = () => {
    this.setState({isActiveRouteHome: true})
  }

  onShowNavbar = () => {
    this.setState({showHamburgerMenu: true})
  }

  onHideNavBar = () => {
    this.setState({showHamburgerMenu: false})
  }

  render() {
    const {isActiveRouteHome, showHamburgerMenu} = this.state
    const homeClassName = isActiveRouteHome ? 'highlight' : ''
    const cartClassName = isActiveRouteHome ? '' : 'highlight'
    const toggleClassName = () => (showHamburgerMenu ? '' : 'inactive')

    return (
      <nav className="navbar-container">
        <div className="website-name-container">
          <Link to="/">
            <img
              src="./img/LogoColor.png"
              alt="website logo"
              className="logo-image"
            />
          </Link>

          <h1 className="heading">Tasty Kitchens</h1>
        </div>

        <button
          className="hamburger-button"
          type="button"
          onClick={this.onShowNavbar}
        >
          <GiHamburgerMenu />
        </button>

        <ul className={`${toggleClassName()} nav-items nav-items-desktop`}>
          <Link to="/" className="nav-link" onClick={this.onClickHomeRoute}>
            <li className={`${homeClassName}`}>Home</li>
          </Link>

          <Link to="/cart" className="nav-link" onClick={this.onClickCartRoute}>
            <li className={`${cartClassName}`}>Cart</li>
          </Link>
          <button
            className="logout-button"
            type="button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={this.onHideNavBar}
          >
            <MdCancel />
          </button>
        </ul>
      </nav>
    )
  }
}
export default withRouter(Navbar)
