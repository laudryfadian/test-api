import { createProduct, getProducts, getProductById, updateProductById } from '../db/products';
import { failed, success } from '../helpers/responses'
import express from 'express';

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const {name, price, description} = req.body;

    if (!name || !price || !description) {
      return failed(res, 'Bad Request', null, 400)
    }

    const product = await createProduct({name, price, description});

    return success(res, 'Successfull', product)
  } catch (error) {

    return failed(res, error, null, 400)
  }
}

export const findAll = async (req: express.Request, res: express.Response) => {
  try {
    const products = await getProducts()

    return success(res, 'Successfull', products)
  } catch (error) {
    
    return failed(res, error, null, 400)
  }
}

export const fineOneById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);
    if (!product) {
      return failed(res, 'Data Not Found', null, 404)
    }
    
    return success(res, 'Successfull', product)
  } catch (error) {
    
    return failed(res, error, null, 400)
  }
}

export const updateById = async ( req: express.Request, res: express.Response ) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return failed(res, 'Bad Request', null, 400)
    }

    const product = await getProductById(id);
    if (!product) {
      return failed(res, 'Data Not Found', null, 404)
    }
    
    const update = await updateProductById(id, {name, price, description});
    if (!update) {
      return failed(res, 'Data Not Found', null, 404)
    }
    
    return success(res, 'Successfull', product)
  } catch (error) {
    
    return failed(res, error, null, 400)
  }
}

export const deleteById = async ( req: express.Request, res: express.Response ) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);
    if (!product) {
      return failed(res, 'Bad Request', null, 400)
    }
    
    const update = await updateProductById(id, {isDelete: true});

    return success(res, 'Successfull', product)
  } catch (error) {
    
    return failed(res, error, null, 400)
  }
}