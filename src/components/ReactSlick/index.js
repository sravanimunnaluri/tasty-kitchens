import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {offersList} = props
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <ul className="carrousel-container">
      <Slider {...settings}>
        {offersList.map(each => (
          <li key={each.id}>
            <img src={each.image_url} alt="offer" className="image" />
          </li>
        ))}
      </Slider>
    </ul>
  )
}

export default ReactSlick
