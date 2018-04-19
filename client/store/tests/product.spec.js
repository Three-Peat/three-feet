/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { fetchProduct, fetchProducts } from '../products';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Product thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {
    allProducts: [],
    selectedProduct: {},
  };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('getProducts', () => {
    it('eventually dispatches the GET PRODUCTS action', () => {
      const fakeProducts = [
        {
          productId: 1,
          photoUrl: 'www.purpleShoe.com',
          name: 'Epic Runner',
          price: 10000,
          brand: 'Nike',
          description: 'Yellow Nike Trainer',
        },
        {
          productId: 2,
          photoUrl: 'www.greenShoe.com',
          name: 'LessE Epic Runner',
          price: 1000,
          brand: 'Adidas',
          description: 'Green Trainer',
        },
      ];
      mockAxios.onGet(`/api/products`).replyOnce(200, fakeProducts);
      return store.dispatch(fetchProducts()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('GET_PRODUCTS');
        expect(actions[0].products).to.be.deep.equal(fakeProducts);
      });
    });
  });

  describe('getProduct', () => {
    it('eventually dispatches the GET PRODUCT action', () => {
      const fakeProduct = {
        productId: 1,
        photoUrl: 'www.purpleShoe.com',
        name: 'Epic Runner',
        price: 10000,
        brand: 'Nike',
        description: 'Yellow Nike Trainer',
      };
      mockAxios.onGet(`/api/products`).replyOnce(200, fakeProduct);
      return store.dispatch(fetchProduct(fakeProduct.productId)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('GET_PRODUCT');
        expect(actions[0].product).to.be.deep.equal(fakeProduct);
      });
    });
  });
});
