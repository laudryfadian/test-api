import { sendMail } from '../controllers/email';
import express from 'express';
import authenticate from '../helpers/auth';

export default (router: express.Router) => {
  router.post('/email', authenticate, sendMail);
};