import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  render() {

    console.log(this.props)
    return (
      <div>
        <button>Add to Cart</button>
      </div>
    );
  }
}

const mapState = state => {
  // const { products } = state;
  // return { products };
};

const mapDispatch = dispatch => {
  // return {
  //   getAllProducts: products => {
  //     dispatch(allProducts(products));
  //   },
  // };
};

export default connect(mapState, mapDispatch)(Cart);
