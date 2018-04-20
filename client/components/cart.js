import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store';

export class Cart extends Component {
  componentDidMount = () => {
    const { getCart } = this.props;
    getCart();
  };

  render() {
    const { cart } = this.props;
    return (
      <div>
        <p>My Cart</p>
        {cart[0] && cart[0].products.map(product => {
          return (
            <div key={product.id}>
              <img src={product.photoUrl} alt="shoe" />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.brand}</p>
            </div>
          );
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
    getCart: cart => {
      dispatch(fetchCart(cart));
    },
    // Going to need this eventually
    // removeFromCart: product => {
    //   dispatch(removeFromCart(product));
    // },
  };
};

export default connect(mapState, mapDispatch)(Cart);
