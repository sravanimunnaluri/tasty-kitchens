import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <img src="./img/NotFound.png" alt="not found" className="notfound-image" />
    <h1 className="notfound-heading">Page Not Found</h1>
    <p className="notfound-subheading">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button className="home-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
