import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store';

export class Cart extends Component {

  componentDidMount = () => {
    // const { getCart } = this.props
    console.log(this.props)
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

export default Cart
