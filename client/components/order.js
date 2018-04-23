import React from 'react';
import { buildOrder } from '../store/orders';
import { purchaseCart, emptyCart } from '../store';

import { connect } from 'react-redux';

const PlaceOrder = props => {
  const handleSubmit = event => {
    event.preventDefault();

    const { createOrder, clearCart } = props;
    const shoeList = props.products.products;
    createOrder(shoeList);
    clearCart();
    purchase();
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
    cart: state.cart,
  };
};

const mapDispatch = dispatch => {
  return {
    createOrder: products => {
      dispatch(buildOrder(products));
    },
    purchase: cart => {
      dispatch(purchaseCart(cart))
    }
    clearCart: () => {
      dispatch(emptyCart());
    },
  };
};

export default connect(mapState, mapDispatch)(PlaceOrder);
