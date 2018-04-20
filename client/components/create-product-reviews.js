import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchProduct } from '../store'

class CreateProductReview extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            rating: 5,
            description: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const userId = this.props.user.id
        const productId = this.props.products.selectedProduct.id
        const { getProductReviews } = this.props
        axios.post('/api/reviews', { ...this.state, userId, productId })
            .then(() => getProductReviews(productId))
    }

    handleChange = event => {
        let { name, value } = event.target
        value = name === `rating` ? +value : value
        this.setState({ [name]: value })
    }

    render() {
        let { reviews } = this.props
        let rating = 0
        const calcRating = productReviews => {
            productReviews.forEach(review => {
                rating += review.rating
            })
            rating = rating / productReviews.length
            return rating
        }
        reviews && (rating = calcRating(reviews))
        reviews && (reviews = reviews.slice(0).reverse())
        return (
            <div style={{ border: `3px solid black`, margin: `10px` }}>
                Write a review!
            <form name="review-form" onSubmit={this.handleSubmit}>
                    Title: <input type="text" name="name" onChange={this.handleChange} /><br />
                    Rating: <select name="rating" onChange={this.handleChange}>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </select><br />
                    Review: <input type="text" name="description" onChange={this.handleChange} /><br />
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
    getProductReviews: productId => {
        dispatch(fetchProduct(productId))
    }
});


export default connect(mapState, mapDispatch)(CreateProductReview);

        /**
         * PROP TYPES
         */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
