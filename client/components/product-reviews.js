import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
            <div className="product-reviews">
            <CreateProductReview />
                <p>Overall rating: {rating ? `${Math.round(rating * 100) / 100} / 5` : `N/A`}</p>
                {reviews && reviews.length !== 0
                    ? reviews.map(review => {
                        const author = users.find(user => user.id === review.userId)
                        return (
                            <div className="product-review" key={review.id}>
                                <p>{review.name} - {`${review.rating} / 5`} - {author ? author.email : `anonymous`}</p>
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
