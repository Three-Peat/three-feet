import React, { Component } from 'react';
import { addToCart, fetchCart } from '../store';
import { connect } from 'react-redux';

class AddToCart extends Component {
  handleAddToCart = () => {
    const { addProductToCart, cart, user, getCart } = this.props;
    const selectedId = this.props.product.id;

    if (user.id && cart.products[0] !== undefined) {
      const cartId = cart.products[0].id;
      addProductToCart({
        productId: selectedId,
        cartId: cartId,
      });
    } else {
      const { product } = this.props;
      addProductToCart(product);
    }
  };

  render() {
    return (
      <div className="add-to-cart">
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
    getCart: cart => {
      dispatch(fetchCart(cart));
    },
  };
};

export default connect(mapState, mapDispatch)(AddToCart);
