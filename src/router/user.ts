import { register, signIn } from '../controllers/user';
import express from 'express';

export default (router: express.Router) => {
  router.post('/user/register', register);
  router.post('/user/signin', signIn);
};