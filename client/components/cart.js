import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Cart extends Component {

<<<<<<< HEAD
=======
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
>>>>>>> aa6aeda62b1a6ec370c2057b558d0d5ec0adc2ef

  render() {

    return (
      <div>
        <p>My Cart</p>
      </div>
    );
  }
}

export default Cart
