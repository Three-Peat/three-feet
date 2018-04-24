import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleProduct from './single-product';
import { fetchCategory } from '../store'
import axios from 'axios'
import RemoveFromCategory from './remove-from-category';
import AddToCart from './add-to-cart'

class SingleCategory extends Component {
  componentDidMount = () => {
    const { categoryId } = this.props.match.params
    const { getOneCategory } = this.props
    getOneCategory(categoryId)
  }

  render() {
    const category = this.props.categories.selectedCategory
    return (
      <div className="single-category-info">
        <h1>{`${category.name} (${category.products && category.products.length})`}</h1>
        <p>{category.description}</p>
        <div className="single-category">
          {category.products && category.products.map(product => {
            return (
              <div className="single-item" key={product.id}>
                <SingleProduct product={product} />
                <AddToCart product={product} />
              </div>
            )
          })}
        </div>
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
    getOneCategory: categoryId => {
      dispatch(fetchCategory(categoryId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleCategory)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
