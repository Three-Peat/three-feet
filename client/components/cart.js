import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store';

export class Cart extends Component {

  constructor(){
    super()
    this.state = {
      products: []
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p>My Cart</p>
      </div>
    );
  }
}

export default Cart
