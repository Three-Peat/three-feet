import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store';
import axios from 'axios'


/**
 * COMPONENT
 */
export class AdminOrders extends Component {

  componentDidMount = () => {
    const { getOrders } = this.props
    getOrders()
  }

  onChange = (event, order) => {
    const { users } = this.props
    let { value } = event.target
    let email;
    users.find(user => user.id === order.userId) && (email = users.find(user => user.id === order.userId).email)
    axios.put(`/api/orders/${order.id}`, { status: value, email })
  }

  render() {
    const { allOrders } = this.props.orders
    const { allProducts } = this.props.products
    return (
      <div>
        {allOrders && allOrders.map(order => {
          const statuses = [`Created`, `Processing`, `Cancelled`, `Completed`]
          return (
            <div key={order.id}>
              <h3>{`Order ${order.id}`}</h3>
              Status: <select onChange={event => this.onChange(event, order)}>
                {statuses.map(status => {
                  if (status === order.status) return (
                    <option selected key={status}>
                      {status}
                    </option>
                  )
                  else return (
                    <option key={status}>
                      {status}
                    </option>
                  )
                })}
              </select>
              {order.orderItems && order.orderItems.map(item => {
                const itemName = allProducts.find(product => product.id === item.productId)
                return (
                  <Link key={item.id} to={`/products/${item.productId}`}>
                    <p>
                      {itemName && `${itemName.name} - $${item.price / 100}`}
                    </p>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }
}

const mapState = state => {
  const { orders, products, users } = state;
  return { orders, products, users };
};

const mapDispatch = dispatch => {
  return {
    getOrders: () => {
      dispatch(fetchOrders())
    }
  }
};

export default connect(mapState, mapDispatch)(AdminOrders);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
