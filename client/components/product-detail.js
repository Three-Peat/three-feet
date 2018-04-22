import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/products';
import AddToCart from './add-to-cart';
import Reviews from './product-reviews';
import AddToCategory from './add-to-category';

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
    const { productId } = this.props.match.params;
    this.props.oneProduct(productId);
  }

  render() {
    const { productId } = this.props.match.params
    const {
      reviews,
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
        <p>{'$' + price / 100}</p>
        <p>{description}</p>
        <AddToCart product={this.props.products.selectedProduct} />
        <Reviews reviews={reviews} />
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
