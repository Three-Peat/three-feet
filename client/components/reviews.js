import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchProduct } from '../store'

class Reviews extends Component {
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
        console.log(getProductReviews)
        axios.post('/api/reviews', { ...this.state, userId, productId })
            .then(() => getProductReviews(productId))
    }

    handleChange = event => {
        let { name, value } = event.target
        value = name === `rating` ? +value : value
        this.setState({ [name]: value })
    }

    render() {
        const { reviews, users } = this.props
        let rating = 0
        const calcRating = productReviews => {
            productReviews.forEach(review => {
                rating += review.rating
            })
            rating = rating / productReviews.length
            return rating
        }
        reviews && (rating = calcRating(reviews))
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
                Overall rating: {Math.round(rating * 100) / 100}
                {reviews && reviews.length !== 0
                    ? reviews.map(review => {
                        const author = users.find(user => user.id === review.userId)
                        return (
                            <div key={review.id} style={{ border: `1px solid black` }}>
                                <p>{review.name} - {author ? author.email : `anonymous`}</p>
                                <p>{review.rating} stars</p>
                                <p>{review.description}</p>
                            </div>
                        )
                    })
                    : <p>There are no reviews for this shoe.</p>
                }
            </div>
        )
    }
}

const mapState = state => ({
    users: state.users,
    user: state.user,
    products: state.products
});

const mapDispatch = dispatch => ({
    getProductReviews: productId => {
        console.log(`fetching product reviews`)
        dispatch(fetchProduct(productId))
    }
});


export default connect(mapState, mapDispatch)(Reviews);

        /**
         * PROP TYPES
         */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
