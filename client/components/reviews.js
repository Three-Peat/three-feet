import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Reviews = props => {
    const { reviews, users } = props
    return (
        <div>
            {reviews && reviews.length !== 0
                ? reviews.map(review => {
                    const author = users.find(user => user.id === review.userId)
                    return (
                        <div key={review.id} style={{ border: `1px solid black` }}>
                            <p>{review.name} - {author && author.email}</p>
                            <p>{review.rating} stars</p>
                            <p>{review.description}</p>
                            <p>{review.description}</p>
                        </div>
                    )
                })
                : <p>No reviews</p>
            }
        </div>
    )
}

const mapState = state => ({
    users: state.users,
});

export default connect(mapState)(Reviews);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
