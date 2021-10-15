import {BsFillCheckCircleFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const OrderSuccess = () => (
  <div className="success-container">
    <div className="payment-container">
      <BsFillCheckCircleFill className="check-icon" />
      <h1 className="payment-header">Payment Successful</h1>
      <p className="thank-you-heading">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="go-home-button">
          Go To Home
        </button>
      </Link>
    </div>
  </div>
)
export default OrderSuccess
