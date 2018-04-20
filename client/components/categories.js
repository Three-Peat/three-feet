import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCategories, postCategory } from '../store'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { get } from 'https';

class Categories extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            description: '',
        }
    }

    componentDidMount = () => {
        const { getAllCategories } = this.props
        getAllCategories()
    }

    handleSubmit = event => {
        event.preventDefault()
        const { getAllCategories } = this.props
        const {name, description} = this.state
        axios.post('/api/categories', { name, description })
            .then(() => getAllCategories())
    }

    handleChange = event => {
        let { name, value } = event.target
        value = name === `rating` ? +value : value
        this.setState({ [name]: value })
    }

    render() {
        const { allCategories } = this.props.categories
        return (
            <div>
                Create a new category!
                <form name="review-form" onSubmit={this.handleSubmit}>
                    Name: <input type="text" name="name" onChange={this.handleChange} /><br />
                    Description: <input type="text" name="description" onChange={this.handleChange} /><br />
                    <input type="submit" value="Submit" />
                </form>
                {allCategories.map(category => {
                    return (
                        <div key={category.id}>
                            <Link to={`/categories/${category.id}`}>{category.name} - {category.description}</Link>
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
        },
    }
}

export default connect(mapState, mapDispatch)(Categories)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
