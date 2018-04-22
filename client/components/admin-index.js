import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios'
import AdminProducts from './admin-products';
import AdminUsers from './admin-users';
import { Link, withRouter, Route, Switch } from 'react-router-dom';

/**
 * COMPONENT
 */
export class AdminIndex extends Component {

  render() {
    const { users } = this.props
    return (
      <div>
      <Link to="admin/products">Products</Link>
      <br></br>
      <Link to="admin/users">Users</Link>
      </div>
    );
  }
}

const mapState = () => {
  return {}
}

export default withRouter(connect(mapState)(AdminIndex));

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
