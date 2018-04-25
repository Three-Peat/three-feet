import React, { Component } from 'react';
import { addToCart, fetchCart } from '../store';
import { connect } from 'react-redux';

class AddToCart extends Component {
  handleAddToCart = () => {
    const { addProductToCart, cart, user, product } = this.props;
    const selectedId = this.props.product.id;
    if (user.id && cart.products[0] !== undefined) {
      const cartId = cart.products[0].id;
      addProductToCart({
        productId: selectedId,
        cartId: cartId,
        max: product.inventory
      });
    } else if (cart.products[selectedId] && cart.products[selectedId].quantity < product.inventory){
      addProductToCart(product);
    } else if (!cart.products[selectedId]) {
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
