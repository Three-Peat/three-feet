import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SingleProduct from './single-product'
import { allProducts } from '../store'

/**
 * COMPONENT
 */
export class AllProducts extends Component {

    componentDidMount = () => {
        const { allProducts } = this.props
        allProducts()
    }

    render() {
        const { products } = this.props
        console.log(this.props)
        return (
            <div>
                {products.map(p => <SingleProduct key={p.id} product={p}/>)}
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    const { products } = state
    return { products }
}

const mapDispatch = dispatch => {
    return {
        allProducts: products => {
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
