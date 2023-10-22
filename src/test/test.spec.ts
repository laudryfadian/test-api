// product.test.js

import { expect } from 'chai';
import { dbConn } from '../db/connection';
import { getProducts, getProductById, createProduct, updateProductById } from '../db/products'; // Sesuaikan path sesuai struktur proyek Anda
import mongoose from 'mongoose';

// Mulai pengujian
describe('Product Model and Functions', function () {
  // Sebelum pengujian, sambungkan ke database
  before(function (done) {
   dbConn();
   done();
 });

  // Setelah pengujian, putus koneksi dari database
  after(function (done) {
    mongoose.disconnect();
    done()
  });

  it('Should create a product', async function () {
    this.timeout(5000);
    const productData = {
      name: 'Test Product',
      price: 10,
      description: 'Test description',
    };

    const product = await createProduct(productData);

    expect(product).to.be.an('object');
    expect(product.name).to.equal(productData.name);
    expect(product.price).to.equal(productData.price);
    expect(product.description).to.equal(productData.description);
  });

  it('Should get all products', async function () {
    const products = await getProducts();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf.above(0);
  });

  it('Should get a product by ID', async function () {
   const productData = {
     name: 'Test Product',
     price: 10,
     description: 'Test description',
   };

   const createdProduct = await createProduct(productData);

   const product = await getProductById(createdProduct._id.toString());

   expect(product).to.be.an('object');
   expect(product.name).to.equal(productData.name);
   expect(product.price).to.equal(productData.price);
   expect(product.description).to.equal(productData.description);
 });

 // Pengujian updateProductById
 it('Should update a product by ID', async function () {
   const productData = {
     name: 'Test Product',
     price: 10,
     description: 'Test description',
   };

   const createdProduct = await createProduct(productData);

   const updateData = {
     name: 'Updated Product',
     price: 20,
     description: 'Updated description',
   };

   const updatedProduct = await updateProductById(createdProduct._id.toString(), updateData);

   expect(updatedProduct).to.be.an('object');
   expect(updatedProduct.name).to.equal(updateData.name);
   expect(updatedProduct.price).to.equal(updateData.price);
   expect(updatedProduct.description).to.equal(updateData.description);
 });
 
});
