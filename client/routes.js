import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  AllCategories,
  SingleCategory,
  Cart,
  ProductDetail,
  AllReviews,
  AdminUsers,
  AdminProducts,
  AdminIndex,
  AdminOrders,
  PasswordReset,
  AfterOrder,
  UserOrders
} from './components';
import {
  me,
  fetchCart,
  fetchProducts,
  fetchCategories,
  fetchUsers,
  fetchOrders,
} from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin, needsPassword } = this.props;
    if (needsPassword) {
      return <PasswordReset />;
    } else {
      return (
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:productId" component={ProductDetail} />
          <Route exact path="/categories" component={AllCategories} />
          <Route path="/categories/:categoryId" component={SingleCategory} />
          <Route path="/cart" component={Cart} />
          <Route path="/reviews" component={AllReviews} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/" component={UserHome} />
              <Route path="/home" component={UserHome} />
              <Route path="/orders" component={UserOrders} />
              <Route path="/reset" component={PasswordReset} />
              <Route path="/after-order" component={AfterOrder} />
              {isAdmin && (
                <Switch>
                  <Route exact path="/admin" component={AdminIndex} />
                  <Route path="/admin/products/" component={AdminProducts} />
                  <Route path="/admin/users/" component={AdminUsers} />
                  <Route path="/admin/orders/" component={AdminOrders} />
                  {/* Routes placed here are only available after logging in as an admin */}
                </Switch>
              )}
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      );
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    needsPassword: state.user.needsPassword,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchCart());
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchUsers());
      dispatch(fetchOrders());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
