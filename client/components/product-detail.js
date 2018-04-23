import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/products';
import AddToCart from './add-to-cart';
import Reviews from './product-reviews';

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
    const {
      reviews,
      photoUrl,
      name,
      price,
      brand,
      description,
      inventory,
    } = this.props.products.selectedProduct;
    return (
      <div className="product-detail">
        <h2>{`${brand} - ${name}`}</h2>
        <img src={photoUrl} alt="shoe" />
        <div className="product-info">
          <p>{'$' + price / 100}</p>
          <p>{description}</p>
          {inventory > 0 ?
            <div className="quantity-cart">
              {inventory} in stock <AddToCart product={this.props.products.selectedProduct} />
            </div> :
            `Currently Unavailable`}
        </div>
        <div>
          <Reviews reviews={reviews} />
        </div>
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
