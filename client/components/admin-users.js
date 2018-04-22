import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios'

/**
 * COMPONENT
 */
export class Admin extends Component {

  makeAdmin = targetUser => {
    const { user } = this.props
    axios.put(`/api/admin/users/${targetUser.id}`, user)
  }

  deleteUser = targetUser => {
    const { user } = this.props
    axios.delete(`/api/admin/users/${targetUser.id}`, {data: user})
  }

  render() {
    const { users } = this.props
    return (
      <div>
        {users.map(user => {
          return (
            <div key={user.id}>
              <p>{user.email}</p>
              <button onClick={() => this.makeAdmin(user)}>
                Make Admin
          </button>
              <button onClick={() => this.deleteUser(user)}>
                Delete User
          </button>
            </div>
          )
        })}
      </div>
    );
  }
}

const mapState = state => {
  const { users, user } = state;
  return { users, user };
};

const mapDispatch = dispatch => {
  return {}
};

export default connect(mapState, mapDispatch)(Admin);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
