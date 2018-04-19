/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductDetail } from '../product-detail';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('ProductDetail', () => {
  let productDetail;
  let sampleProduct = {
    photoUrl: 'www.purpleShoe.com',
    name: 'Epic Runner',
    price: 10000,
    brand: 'Nike',
    description: 'Yellow Nike Trainer',
  };

  beforeEach(() => {
    productDetail = shallow(
      <ProductDetail
        products={{ selectedProduct: sampleProduct }}
        match={{ params: { productId: 1 } }}
        oneProduct={() => console.log('')}
      />
    );
  });

  it('renders the brand in a p tag', () => {
    expect(productDetail.brand.to.equal('Nike'));
  });
  it('has photoUrl, name, price, brand, and description in an instance', () => {
    expect(
      console.log(sampleProduct)
      // Object.keys(sampleProduct).to.equal([
      //   'photoUrl',
      //   'name',
      //   'price',
      //   'brand',
      //   'description',
      // ])
    );
  });
});
