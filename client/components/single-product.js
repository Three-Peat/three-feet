import React from 'react';
import AddToCart from './add-to-cart';
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

/**
 * COMPONENT
 */
const SingleProduct = props => {
  const { photoUrl, name, price, brand, inventory } = props.product;
  return (
    <div className="single-product">
      <Link to={`/products/${props.product.id}`}>
        <div className="photo">
          <img src={photoUrl} alt="shoe" />
        </div>
        <div className="info">
          <p>{name}</p>
          <p>${price / 100}</p>
          <p>{brand}</p>
          <p>{inventory} in stock</p>
        </div>
      </Link>
    </div>
  );
};

/**
 * CONTAINER
 */

export default SingleProduct;

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
