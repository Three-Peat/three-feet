import React, { Component } from 'react';

class AddToCart extends Component {
  handleAddToCart = () => {
    console.log(this.props);
    // const addedProduct = this.props.products.selectedProduct;
    // this.setState({ cart: [...this.state.cart, addedProduct] });
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

export default AddToCart;
