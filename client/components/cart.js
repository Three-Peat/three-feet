import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store';
import { Link } from 'react-router-dom';

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
                <p>Quantity: {product.quantity}</p>
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
