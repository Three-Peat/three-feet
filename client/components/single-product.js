import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cart from './cart';

/**
 * COMPONENT
 */
const SingleProduct = (props) => {
  const { photoUrl, name, price, brand } = props.product
  return (
    <div>
      <img src={photoUrl} alt="shoe" />
      <p>{name}</p>
      <p>{price}</p>
      <p>{brand}</p>
      <Cart />
    </div>
  )
}

/**
 * CONTAINER
 */

export default SingleProduct

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
