import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store';
import axios from 'axios'


/**
 * COMPONENT
 */
export class UserOrders extends Component {

  componentDidMount = () => {
    const { getOrders } = this.props
    getOrders()
  }

  render() {
    const { allOrders } = this.props.orders
    const { allProducts } = this.props.products
    const { user } = this.props
    return (
      <div className="my-orders">
      <h1>My Orders</h1>
        {allOrders && allOrders.filter(order => order.userId === user.id).map(order => {
          console.log(order)
          return (
            <div key={order.id}>
              <h3>{`Order ${order.id}`}</h3>
              Status: {order.status}
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
              <p>Shipped to:</p>
              <p>{order.address && order.address.name}</p>
              <p>{order.address && order.address.street}</p>
              <p>{order.address && `${order.address.city}, ${order.address.state}  ${order.address.zip} `}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

const mapState = state => {
  const { orders, products, users, user } = state;
  return { orders, products, users, user };
};

const mapDispatch = dispatch => {
  return {
    getOrders: () => {
      dispatch(fetchOrders())
    }
  }
};

export default connect(mapState, mapDispatch)(UserOrders);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
