import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/products';

/**
 * COMPONENT
 */
class ProductDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.productId;
    this.props.oneProduct(id);
  }

  render() {
    const {
      photoUrl,
      name,
      price,
      brand,
      description,
    } = this.props.products.selectedProduct;
    return (
      <div>
        <img src={photoUrl} alt="shoe" />
        <p>{brand + ' ' + name}</p>
        <p>{'$' + price}</p>
        <p>{description}</p>
        <button>Add to Cart</button>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products,
});

const mapDispatch = dispatch => ({
  oneProduct: id => dispatch(fetchProduct(id)),
});

export default connect(mapState, mapDispatch)(ProductDetail);
