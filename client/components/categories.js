import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { allCategories } from '../store'
import { Link } from 'react-router-dom'

class Categories extends Component {
    componentDidMount = () => {
        const { getAllCategories } = this.props
        getAllCategories()
    }

    render() {
        const { categories } = this.props
        return (
            <div>
                {categories.map(category => {
                    return (
                        <div key={category.id}>
                            <Link to={`/categories/${category.id}`}>{category.name}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = state => {
    const { categories } = state
    return { categories }
}

const mapDispatch = dispatch => {
    return {
        getAllCategories: categories => {
            dispatch(allCategories(categories))
        }
    }
}

export default connect(mapState, mapDispatch)(Categories)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
