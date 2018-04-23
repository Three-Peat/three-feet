import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import { fetchOrders } from '../store'

/**
 * COMPONENT
 */
export class AdminIndex extends Component {

  componentDidMount = () => {
    const { getOrders } = this.props
    getOrders()
  }

  render() {
    const { users } = this.props
    return (
      <div>
        <Link to="admin/products">Products</Link>
        <br></br>
        <Link to="admin/orders">Orders</Link>
        <br></br>
        <Link to="admin/users">Users</Link>
      </div>
    );
  }
}

const mapState = () => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => {
      dispatch(fetchOrders())
    }
  }
};

export default withRouter(connect(mapState, mapDispatch)(AdminIndex));

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
