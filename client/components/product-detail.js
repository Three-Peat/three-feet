import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oneProduct } from '../store/products';

/**
 * COMPONENT
 */
class ProductDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.oneProduct(id);
  }

  render() {
    const { photoUrl, name, price, brand, description } = this.props.products;
    console.log('the state>>>>', this.props.products);
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
  oneProduct: id => dispatch(oneProduct(id)),
});

export default connect(mapState, mapDispatch)(ProductDetail);
