import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCategories } from '../store'
import { Link } from 'react-router-dom'

class Categories extends Component {
    componentDidMount = () => {
        const { getAllCategories } = this.props
        getAllCategories()
    }

    render() {
        const { allCategories } = this.props.categories
        return (
            <div>
                {allCategories.map(category => {
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
            dispatch(fetchCategories(categories))
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
