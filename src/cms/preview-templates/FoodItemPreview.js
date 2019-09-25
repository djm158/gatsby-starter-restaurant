import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem } from '../../pages/index'

const FoodItemPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()
  console.log(data);
  console.log('here');
  if (data) {
    return (
      <MenuItem
        description={data.description}
        prices={data.prices}
        title={data.title}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

FoodItemPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  })
}

export default FoodItemPreview