import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store';
import { Link } from 'react-router-dom';
import RemoveFromCart from './remove-from-cart'
import SingleProduct from './single-product'

export class Cart extends Component {
  componentDidMount = () => {
    if (!this.props.cart) {
      const { getCart } = this.props;
      getCart();
    }
  };

  render() {
    const { cart, user } = this.props;
    let userCart;
    if (user.id && cart.products[0] !== undefined) {
      userCart = cart.products[0].products;
    } else {
      userCart = [...Object.values(cart.products)];
    }
    return (
      <div>
        <h2 className="my-cart">My Cart</h2>
        {userCart &&
          userCart.map(product => {
            return (
              <div className="cart" key={product.id + 1}>
                <div className="cart-product">
                  <SingleProduct product={product} />
                  {user.id ? (
                    <p>Quantity: {product.productCart.quantity}</p>
                  ) : (
                      <p>Quantity: {product.quantity}</p>
                    )}
                  <RemoveFromCart product={product} />
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
const mapState = state => {
  const { cart, user } = state;
  return { cart, user };
};

const mapDispatch = dispatch => {
  return {
    getCart: cart => {
      dispatch(fetchCart(cart));
    },
    // Going to need this eventually
    // removeFromCart: product => {
    //   dispatch(removeFromCart(product));
    // },
  };
};

export default connect(mapState, mapDispatch)(Cart);
