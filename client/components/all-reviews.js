import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchReviews } from '../store'

class AllReviews extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            rating: 5,
            description: '',
        }
    }

    componentDidMount = () => {
        const { getAllReviews } = this.props
        getAllReviews()
    }

    render() {
        let { users } = this.props
        let { allReviews } = this.props.reviews
        return (
            <div style={{ border: `3px solid black`, margin: `10px` }}>
                {allReviews && allReviews.length !== 0
                    ? allReviews.map(review => {
                        const author = users.find(user => user.id === review.userId)
                        return (
                            <div key={review.id} style={{ border: `1px solid black` }}>
                                <p>{review.name} - {author ? author.email : `anonymous`}</p>
                                <p>{review.rating} stars</p>
                                <p>{review.description}</p>
                            </div>
                        )
                    })
                    : <p>There are no reviews.</p>
                }
            </div>
        )
    }
}

const mapState = state => ({
    users: state.users,
    user: state.user,
    reviews: state.reviews
});

const mapDispatch = dispatch => ({
    getAllReviews: () => {
        dispatch(fetchReviews())
    }
});


export default connect(mapState, mapDispatch)(AllReviews);

        /**
         * PROP TYPES
         */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
