import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, updateCart, purchaseCart } from '../store';
import { Link, withRouter } from 'react-router-dom';
import RemoveFromCart from './remove-from-cart';
import SingleProduct from './single-product';
import PlaceOrder from './order';
import AddressInput from './address-input';

export class Cart extends Component {
  componentDidMount() {
    const { getCart } = this.props;
    getCart();
  }

  increaseQuantity = prod => {
    const { updateCartQuantity } = this.props;
    if (prod.quantity) prod.quantity++;
    else prod.quantity = prod.productCart.quantity++;
    updateCartQuantity(prod);
  };

  decreaseQuantity = prod => {
    const { updateCartQuantity } = this.props;
    if (prod.quantity) prod.quantity--;
    else prod.quantity = 1;
    updateCartQuantity(prod);
  };

  render() {
    const { cart, user } = this.props;
    let userCart;
    if (user.id && cart.products[0]) {
      userCart = cart.products[0].products;
    } else {
      userCart = [...Object.values(cart.products)];
    }
    return (
      <div>
        <h1 className="my-cart">My Cart</h1>
        <PlaceOrder products={cart.products[0]} />
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
                  <button onClick={evt => this.decreaseQuantity(product, evt)}>
                    -1
                  </button>
                  <button onClick={evt => this.increaseQuantity(product, evt)}>
                    +1
                  </button>
                  <RemoveFromCart product={product} />
                </div>
              </div>
            );
          })}
        {user.id && <AddressInput />}
        {user.id && <PlaceOrder products={cart.products[0]} />}
      </div>
    );
  }
}
const mapState = state => {
  const { cart, user, address } = state;
  return { cart, user, address };
};

const mapDispatch = dispatch => {
  return {
    getCart: cart => {
      dispatch(fetchCart(cart));
    },
    updateCartQuantity: product => {
      dispatch(updateCart(product));
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Cart));
