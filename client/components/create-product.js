import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchProducts } from '../store'

class CreateProduct extends Component {
    constructor() {
        super()

        this.state = {
            color: ``,
            price: ``,
            size: ``,
            brand: ``,
            description: ``,
            name: ``,
            inventory: ``
        }
    }

    handleSubmit = event => {
        const { getProducts } = this.props
        event.preventDefault()
        axios.post('/api/products/', this.state)
            .then(() => getProducts())
    }

    handleChange = event => {
        let { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div style={{ border: `3px solid black`, margin: `10px` }}>
                Create a product!
            <form name="review-form" onSubmit={this.handleSubmit}>
                    Name: <input type="text" name="name" onChange={this.handleChange} /><br />
                    Description: <input type="text" name="description" onChange={this.handleChange} /><br />
                    Price: <input type="text" name="price" onChange={this.handleChange} /><br />
                    Inventory: <input type="text" name="inventory" onChange={this.handleChange} /><br />
                    Brand: <input type="text" name="brand" onChange={this.handleChange} /><br />
                    Size: <input type="text" name="size" onChange={this.handleChange} /><br />
                    Color: <input type="text" name="color" onChange={this.handleChange} /><br />
                    PhotoUrl: <input type="text" name="photo-url" onChange={this.handleChange} /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapState = state => ({
    user: state.user,
    products: state.products
});

const mapDispatch = dispatch => ({
    getProducts: productId => {
        dispatch(fetchProducts(productId))
    }
});


export default connect(mapState, mapDispatch)(CreateProduct);

        /**
         * PROP TYPES
         */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
