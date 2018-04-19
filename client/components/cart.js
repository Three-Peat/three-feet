import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store';

export class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount = () => {
    const { getCart } = this.props;
    // getCart()
  };

  render() {

    return (
      <div>
        <p>My Cart</p>
      </div>
    );
  }
}

const mapState = state => {
  const { cart } = state;
  return { cart };
};

const mapDispatch = dispatch => {
  return {
    getCart: cart => {
      dispatch(fetchCart(cart));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
