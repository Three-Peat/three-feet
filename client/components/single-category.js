import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
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

  onClick = () => {
    const { categoryId } = this.props.match.params
    const { getOneCategory } = this.props
    getOneCategory(categoryId)
  }

  render() {
    const { allCategories } = this.props.categories
    const routeCategory = allCategories.filter(cat => cat.id === +this.props.ownProps.match.params.categoryId)
    const category = this.props.categories.allCategories.filter(cat => cat.id === routeCategory[0].id)[0]
    if (category) return (
      <div className="single-category-info">
        <div className="categories">
          <h1>Browse Categories</h1>
          {allCategories.map(cat => {
            return (
              <div className="categories" key={cat.id}>
                <Link onClick={this.onClick} to={`/categories/${cat.id}`}>{cat.name} - {cat.description}</Link>
              </div>
            )
          })}
        </div>
        <h1>{`${category.name} (${category.products && category.products.filter(product => product.inventory > 0).length})`}</h1>
        <p>{category.description}</p>
        <div className="single-category">
          {category.products && category.products.map(product => {
            if (product.inventory > 0) return (
              <div className="single-item" key={product.id}>
                <SingleProduct product={product} />
                <AddToCart product={product} />
              </div>
            )
          })}
        </div>
      </div>
    )
    else return (
      <div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const { categories } = state
  return { categories, ownProps }
}

const mapDispatch = dispatch => {
  return {
    getOneCategory: categoryId => {
      dispatch(fetchCategory(categoryId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleCategory))

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
