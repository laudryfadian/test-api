import express from 'express';
import product from './product';
import user from './user';

const router = express.Router();

export default (): express.Router => {
  product(router);
  user(router);

  return router;
}