import React, { Component } from 'react';
import { addToCart } from '../store';
import { connect } from 'react-redux';

class AddToCart extends Component {
  handleAddToCart = () => {
    const { addProductToCart, cart, user } = this.props;
    const selectedId = this.props.product.id;
    if (user.id) {
      const cartId = cart[0].id;
      addProductToCart({ productId: selectedId, cartId: cartId});
    } else {
      const { product } = this.props;
      addProductToCart(product);
    }
  };

  render() {
    return (
      <div>
        <button type="submit" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapState = state => {
  const { cart, user } = state;
  return { cart, user };
};

const mapDispatch = dispatch => {
  return {
    addProductToCart: product => {
      dispatch(addToCart(product));
    },
  };
};

export default connect(mapState, mapDispatch)(AddToCart);
