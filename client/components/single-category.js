import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleProduct from './single-product';
import { oneCategory } from '../store'

class SingleCategory extends Component {
  componentDidMount = () => {
    const { categoryId } = this.props.match.params
    const { getOneCategory } = this.props
    getOneCategory(categoryId)
  }

  render() {
    const { category } = this.props
    return (
      <div>
        <h1>{`${category.name} (${category.products && category.products.length})`}</h1>
        {category.products && category.products.map(product => <SingleProduct key={product.id} product={product} />)}
      </div>
    )
  }
}

const mapState = state => {
  const { category } = state
  return { category }
}

const mapDispatch = dispatch => {
  return {
    getOneCategory: categoryId => {
      dispatch(oneCategory(categoryId))
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
