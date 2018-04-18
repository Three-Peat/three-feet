import React from 'react';
import AddToCart from './add-to-cart';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

/**
 * COMPONENT
 */
const SingleProduct = props => {
  const { photoUrl, name, price, brand } = props.product;
  return (
    <div>
      <a href={`/products/${props.product.id}`}>
        <img src={photoUrl} alt="shoe" />
      </a>
      <p>{name}</p>
      <p>{price}</p>
      <p>{brand}</p>
      <AddToCart product={props.product} />
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
