import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ShoeOfTheDay from './shoe-of-the-day';
import { fetchProducts } from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {

  componentDidMount = () => {
    const { getAllProducts } = this.props;
    getAllProducts();
  };

  render() {
    const { email } = this.props
    const products = this.props.products.allProducts
    const today = new Date().getDate()
    const shoeOfTheDay = products[today]
    return (
      <div className="user-home" >
        <h2>Welcome, {email}</h2>
        <h3>Shoe of the day:</h3>
        <ShoeOfTheDay product={shoeOfTheDay} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: products => {
      dispatch(fetchProducts(products));
    },
  };
};


export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
