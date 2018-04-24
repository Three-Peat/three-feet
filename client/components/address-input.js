import React, { Component } from 'react';

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
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {}

  render() {
    return (
      <div name="address-form">
        <form>
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
        </form>
      </div>
    );
  }
}

export default AddressInput;
