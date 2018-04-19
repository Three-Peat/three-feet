import React, { Component } from 'react';
import { addToCart } from '../store';
import { connect } from 'react-redux';

class AddToCart extends Component {
  handleAddToCart = () => {
    console.log(this.props);
    const { addProductToCart } = this.props

    const selected = this.props.product;
    addProductToCart(selected)
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

// export default AddToCart;
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
