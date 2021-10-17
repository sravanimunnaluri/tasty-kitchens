import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="tasty-kitchen-footer">
    <div className="footer-website-name-container">
      <img
        src="./img/WebsiteLogo.png"
        alt="website-footer-logo"
        className="company-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-subheading">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons-container">
      <FaPinterestSquare testid="pintrest-social-icon" className="fill-icon" />

      <FaInstagram testid="instagram-social-icon" className="icon" />
      <FaTwitter testid="twitter-social-icon" className="icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="fill-icon" />
    </div>
  </div>
)

export default Footer
