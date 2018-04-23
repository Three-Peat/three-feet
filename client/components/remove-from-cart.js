import React, { Component } from 'react';
import { removeItemFromCart, fetchCart } from '../store';
import { connect } from 'react-redux';

class RemoveFromCart extends Component {
  handleAddToCart = () => {
    const { removeProductFromCart, cart, user, getCart } = this.props;
    const selectedId = this.props.product.id;
    const {products} = cart

    if (user.id) {
      const cartId = products[0].id;
      removeProductFromCart({
        productId: selectedId,
        cartId: cartId,
      });
      getCart()
    } else {
      const { product } = this.props;
      console.log(product)
      removeProductFromCart(product);
      setTimeout(getCart, 50);
    }
  };

  render() {
    return (
      <div>
        <button type="submit" onClick={this.handleAddToCart}>
          Remove Item
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
    removeProductFromCart: product => {
      dispatch(removeItemFromCart(product));
    },
    getCart: cart => {
      dispatch(fetchCart(cart));
    },
  };
};

export default connect(mapState, mapDispatch)(RemoveFromCart);
