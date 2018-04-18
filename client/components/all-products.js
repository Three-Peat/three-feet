import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleProduct from './single-product'
import { allProducts } from '../store'

class AllProducts extends Component {
    componentDidMount = () => {
        const { getAllProducts } = this.props
        getAllProducts()
    }

    render() {
        const { products } = this.props
        return (
            <div>
                {products.map(product => <SingleProduct key={product.id} product={product} />)}
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
            dispatch(allProducts(products))
        }
    }
}

export default connect(mapState, mapDispatch)(AllProducts)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
