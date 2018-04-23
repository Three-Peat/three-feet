import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, updateCart } from '../store';
import { Link } from 'react-router-dom';
import RemoveFromCart from './remove-from-cart';

export class Cart extends Component {
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
    if (user.id && cart.products[0] !== undefined) {
      userCart = cart.products[0].products;
    } else {
      userCart = [...Object.values(cart.products)];
    }
    return (
      <div>
        <p>My Cart</p>
        {userCart &&
          userCart.map(product => {
            return (
              <div key={product.id + 1}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.photoUrl} alt="shoe" />
                </Link>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.brand}</p>
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
    updateCartQuantity: product => {
      dispatch(updateCart(product));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
