import { create, findAll, fineOneById, updateById, deleteById } from '../controllers/product';
import express from 'express';
import authenticate from '../helpers/auth';

export default (router: express.Router) => {
  router.post('/product', authenticate, create);
  router.get('/product', authenticate, findAll);
  router.get('/product/:id', authenticate, fineOneById);
  router.put('/product/:id', authenticate, updateById);
  router.delete('/product/:id', authenticate, deleteById);
};