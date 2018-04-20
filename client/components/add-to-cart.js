import React, { Component } from 'react';
import { addToCart } from '../store';
import { connect } from 'react-redux';

class AddToCart extends Component {
  handleAddToCart = () => {
    const { addProductToCart, cart } = this.props
    const selectedId = this.props.product.id;

    addProductToCart({productId: selectedId, cartId: cart[0].id})
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
  const { cart } = state
  return { cart }
}

const mapDispatch = dispatch => {
  return {
      addProductToCart: product => {
          dispatch(addToCart(product))
      }
  }
}

export default connect(mapState, mapDispatch)(AddToCart)
