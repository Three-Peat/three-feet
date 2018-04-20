import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCategories, postCategory } from '../store'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { get } from 'https';

class AddToCategory extends Component {
    constructor() {
        super()

        this.state = {
            categoryId: 1,
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const { getAllCategories } = this.props
        const { categoryId } = this.state
        const { productId } = this.props
        console.log(productId, categoryId)
        axios.post(`/api/categories/${categoryId}/products/${productId}`, { productId, categoryId })
            .then(() => getAllCategories())
    }

    handleChange = event => {
        let { name, value } = event.target
        this.setState({ [name]: +value })
    }

    render() {
        const { allCategories } = this.props.categories
        return (
            <div>
                Add shoe to a category!
                <form name="category-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    Category: <select name="categoryId">
                        {allCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                    <input type="submit" value="Submit" />
                </form>
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
        },
    }
}

export default connect(mapState, mapDispatch)(AddToCategory)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
