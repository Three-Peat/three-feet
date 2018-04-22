import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { get } from 'https';

class AddToCategory extends Component {
  constructor(props) {
    super(props)

    const { allCategories } = props.categories
    const { categories } = props.product
    const productCategories = allCategories.filter(cat => {
      return !categories.find(category => category.id === cat.id)
    })

    this.state = {
      categoryId: productCategories[0] && productCategories[0].id || '',
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { categoryId } = this.state
    const { getAllProducts } = this.props
    const productId = this.props.product.id
    axios.post(`/api/categories/${categoryId}/products/${productId}`, { productId, categoryId })
      .then(() => getAllProducts())
  }

  handleChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: +value })
  }

  render() {
    const { allCategories } = this.props.categories
    const { categories } = this.props.product
    const productCategories = allCategories.filter(cat => {
      return !categories.find(category => category.id === cat.id)
    })
    return (
      <div>
        Add shoe to a category!
                <form name="category-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          Category: <select name="categoryId">
            {productCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
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

export default connect(mapState, mapDispatch)(AddToCategory)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
