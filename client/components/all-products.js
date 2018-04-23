import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleProduct from './single-product';
import { fetchProducts, fetchCart } from '../store';
import SearchProducts from './search-products';
import AddToCart from './add-to-cart';

/**
 * COMPONENT
 */
export class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleChange = evt => {
    const value = evt.target.value;
    this.setState({
      inputValue: value,
    });
  };

  componentDidMount = () => {
    const { getAllProducts } = this.props;
    getAllProducts();
  };

  render() {
    const products = this.props.products.allProducts;
    const inputValue = this.state.inputValue.toLowerCase();
    const filteredProducts = products.slice().reverse().filter(product => {
      return (
        product.name.toLowerCase().match(inputValue) ||
        product.brand.toLowerCase().match(inputValue)
      );
    });
    return (
      <div>
        <SearchProducts
          handleChange={this.handleChange}
          inputValue={inputValue}
        />
        {filteredProducts.map(product => {
          return (
            <div key={product.id}>
              <SingleProduct product={product} />
              <AddToCart product={product} />
            </div>
          )
        })}
      </div>
    );
  }
}

const mapState = state => {
  const { products, cart } = state;
  return { products, cart };
};

const mapDispatch = dispatch => {
  return {
    getAllProducts: products => {
      dispatch(fetchProducts(products));
    },
  };
};

export default connect(mapState, mapDispatch)(AllProducts);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
