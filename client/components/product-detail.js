import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/products';
import AddToCart from './add-to-cart';

/**
 * COMPONENT
 */
export class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  handleAddToCart = () => {
    const addedProduct = this.props.products.selectedProduct;
    this.setState({ cart: [...this.state.cart, addedProduct] });
  };

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
        <AddToCart product={this.props.products.selectedProduct} />
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
