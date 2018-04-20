import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Cart extends Component {
  render() {
    const { cart } = this.props
    // right now this is a cart id, not product ID
    return (
      <div>
        <p>My Cart</p>
        {cart.map(product => {
          return <p key={product.id}>{product.id}</p>
        })}
      </div>
    );
  }
}
const mapState = state => {
  const { cart } = state;
  return { cart };
};

const mapDispatch = dispatch => {
  return {
    // Going to need this eventually
    // removeFromCart: product => {
    //   dispatch(removeFromCart(product));
    // },
  };
};

export default connect(mapState, mapDispatch)(Cart);
