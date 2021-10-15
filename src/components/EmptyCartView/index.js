import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="./img/noorders-md.png"
      className="no-orders-image"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">No Order Yet!</h1>
    <p className="add-menu">Your cart is empty. Add something from the menu.</p>

    <Link to="/">
      <button type="button" className="order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
