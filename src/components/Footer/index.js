import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
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
        <FaPinterestSquare
          className="fill-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="icon" testid="instagram-social-icon" />
        <FaTwitter className="icon" testid="twitter-social-icon" />
        <FaFacebookSquare className="fill-icon" testid="facebook-social-icon" />
      </div>
    </div>
  )
}
