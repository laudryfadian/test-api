import express from 'express';
import product from './product';
import user from './user';
import email from './email';

const router = express.Router();

export default (): express.Router => {
  product(router);
  user(router);
  email(router);

  return router;
}