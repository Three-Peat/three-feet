import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import { Link } from 'react-router-dom'
import axios from 'axios'

class AdjustInventory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inventory: props.product.inventory,
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { inventory } = this.state
    const { getAllProducts } = this.props
    const productId = this.props.product.id
    axios.put(`/api/products/${productId}`, { inventory })
      .then(() => getAllProducts())
  }

  handleChange = event => {
    let { value } = event.target
    this.setState({ inventory: +value })
  }

  render() {
    const { product } = this.props
    return (
      <div>
        Adjust inventory!
        <form name="inventory-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          Inventory: <input defaultValue={product.inventory} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  const { categories } = state
  return { categories }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: products => {
      dispatch(fetchProducts(products));
    },
  };
};

export default connect(mapState, mapDispatch)(AdjustInventory)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
