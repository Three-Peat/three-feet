import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/products';
import AddToCart from './add-to-cart';
import Reviews from './product-reviews';

/**
 * COMPONENT
 */
export class ShoeOfTheDay extends Component {
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

  render() {
    const { product } = this.props
    if (product) return (
      <div className="product-detail">
        <h2>{`${product.brand} - ${product.name}`}</h2>
        <div className="shoe-img">
          <img src={product.photoUrl} alt="shoe" />
        </div>
        <div className="product-info">
          <p>{'$' + product.price / 100}</p>
          <p>{product.description}</p>
          {product.inventory > 0 ?
            <div className="quantity-cart">
              {product.inventory} in stock <AddToCart product={product} />
            </div> :
            `Currently Unavailable`}
        </div>
      </div>
    );
    else return (
      <div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
});

const mapDispatch = dispatch => ({
  oneProduct: id => dispatch(fetchProduct(id)),
});

export default connect(mapState, mapDispatch)(ShoeOfTheDay);
