import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, emptyCart } from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="navbar">
    <nav>
      {isLoggedIn ? (
        isAdmin ? (
          <div>
            {/* The navbar will show these links after you log in if you are an admin */}
            <Link id="title" to="/home">3|||FEET </Link>
            <Link to="/products">Shoes</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/admin">Admin</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link id="title" to="/home">3|||FEET </Link>
              <Link to="/products">Shoes</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/cart">My Cart</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          )
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link id="title" to="/">3|||FEET </Link>
            <Link to="/products">Shoes</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(emptyCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
