import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAddress } from '../store/address';

class AddressInput extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value.toUpperCase() });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.postAddress(this.state);
  }

  render() {
    return (
      <div>
        <form name="address-form" onSubmit={this.handleSubmit}>
          Name:<input type="text" name="name" onChange={this.handleChange} />
          <br />
          Street:<input
            type="text"
            name="street"
            onChange={this.handleChange}
          />
          <br />
          City:<input type="text" name="city" onChange={this.handleChange} />
          <br />
          State:<input type="text" name="state" onChange={this.handleChange} />
          <br />
          Zip:<input type="text" name="zip" onChange={this.handleChange} />
          <br />
          <button type="submit">Update Address</button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    shoes: state.products,
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatch = dispatch => {
  return {
    postAddress: address => {
      dispatch(createAddress(address));
    },
  };
};

export default connect(mapState, mapDispatch)(AddressInput);
