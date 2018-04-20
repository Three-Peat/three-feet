import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchProduct } from '../store'
import CreateProductReview from './create-product-reviews';

class ProductReviews extends Component {

    render() {
        let { reviews, users } = this.props
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
            <div>
            <CreateProductReview />
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
        dispatch(fetchProduct(productId))
    }
});


export default connect(mapState, mapDispatch)(ProductReviews);

        /**
         * PROP TYPES
         */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
