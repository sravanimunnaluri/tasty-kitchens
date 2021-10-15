import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const PopularRestaurantsHeader = props => {
  const {sortByOptions, activeOptionId, onChangeSortByOption} = props
  const onChangeOption = event => {
    console.log(event.target.value)
    onChangeSortByOption(event.target.value)
  }

  return (
    <div className="Restaurants-header">
      <h1 className="Restaurants-list-heading">popular Restaurants</h1>
      <div className="sort-by-container">
        <p className="restaurant-caption">
          select your favourite restaurant special dish and make your day
          happy...
        </p>

        <div className="filter">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-by">Sort by</p>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeOption}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.id}
                value={eachOption.value}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr className="horizontal-line" />
    </div>
  )
}

export default PopularRestaurantsHeader
