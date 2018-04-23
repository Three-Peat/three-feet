import React from 'react';
import { buildOrder } from '../store/orders';
import { connect } from 'react-redux';

const PlaceOrder = props => {
  const handleSubmit = event => {
    event.preventDefault();
    const { createOrder } = props;
    const shoeList = props.products.products;
    createOrder(shoeList);
  };

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        Submit Order
      </button>
    </div>
  );
};

const mapState = state => {
  return {
    shoes: state.products,
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    createOrder: products => {
      dispatch(buildOrder(products));
    },
  };
};

export default connect(mapState, mapDispatch)(PlaceOrder);
