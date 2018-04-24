import React from 'react';
import { buildOrder } from '../store/orders';
import { purchaseCart, emptyCart } from '../store';
// import { createAddress } from '../store/address';

import { connect } from 'react-redux';

const PlaceOrder = props => {
  const handleSubmit = event => {
    event.preventDefault();
    const { createOrder, clearCart, purchase, addresses } = props;
    const shoeList = props.products.products;
    let usedAddress = addresses.selectedAddress;
    createOrder(shoeList, usedAddress);
  };

  return (
    <div className="place-order">
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
    addresses: state.addresses,
  };
};

const mapDispatch = dispatch => {
  return {
    createOrder: (products, address) => {
      dispatch(buildOrder(products, address));
    },
    purchase: cart => {
      dispatch(purchaseCart(cart));
    },
    clearCart: () => {
      dispatch(emptyCart());
    },
    // postAddress: address => {
    //   dispatch(createAddress(address));
    // },
  };
};

export default connect(mapState, mapDispatch)(PlaceOrder);
