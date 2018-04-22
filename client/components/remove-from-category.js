import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleProduct from './single-product';
import { fetchProducts } from '../store'
import axios from 'axios'

class RemoveFromCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: props.product.categories[0] && props.product.categories[0].id || '',
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { categoryId } = this.state
    const productId = this.props.product.id
    const { getAllProducts } = this.props
    axios.delete(`/api/categories/${categoryId}/products/${productId}`)
      .then(() => getAllProducts())
  }

  handleChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: +value })
  }

  componentDidMount = () => {
    this.setState({
      categoryId: this.props.product.categories[0] && this.props.product.categories[0].id || '',
    })
  }

  render() {
    const { categories } = this.props.product
    return (
      <div>
        Remove shoe from a category!
      <form name="remove-category-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          Category: <select name="categoryId">
            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  const { products } = state
  return { products }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: products => {
      dispatch(fetchProducts(products));
    },
  };
};

export default connect(mapState, mapDispatch)(RemoveFromCategory)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
