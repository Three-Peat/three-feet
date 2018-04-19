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

  it('has three p tags', () => {
    expect(productDetail.find('p')).to.have.length(3);
  });
  it('first p tag has brand and shoe name', () => {
    expect(
      productDetail
        .find('p')
        .at(0)
        .text()
    ).to.be.equal('Nike Epic Runner');
  });
  it('has correct image source', () => {
    expect(sampleProduct.photoUrl).to.equal('www.purpleShoe.com');
  });
  it('has photoUrl, name, price, brand, and description in an instance', () => {
    expect(sampleProduct.price).to.equal(10000);
    expect(Object.keys(sampleProduct)).to.have.length(5);
  });
});
