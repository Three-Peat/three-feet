import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { auth } from '../store';
import history from '../history'

/**
 * COMPONENT
 */

class PasswordReset extends Component {
  constructor() {
    super()

    this.state = {
      password: `password`,
    }
  }


  onChange = event => {
    const { value } = event.target
    this.setState({ password: value })
  }

  onSubmit = event => {
    event.preventDefault()
    const {password} = this.state
    const {id, email} = this.props.user
    const {login} = this.props
    axios.put(`/auth/reset`, {password, id})
    login(email, password)
    window.location.reload()
  }

  render() {
    const { email, id } = this.props.user
    console.log('render')
    return (
      <div>
        <h3>{email}, please reset your password.</h3>
        <form onChange={this.onChange} onSubmit={this.onSubmit}>
          <input name='password' type="password" />
          <input name='submit' type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    login: (email, password) => {
      dispatch(auth(email, password, `login`))
    }
  }
}

export default connect(mapState, mapDispatch)(PasswordReset)

/**
 * PROP TYPES
 */
