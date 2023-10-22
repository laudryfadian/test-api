import { create, findAll, fineOneById, updateById, deleteById } from '../controllers/product';
import express from 'express';
import authenticate from '../helpers/auth';

export default (router: express.Router) => {
  /**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Mendapatkan daftar pengguna
 *     description: Mendapatkan daftar pengguna yang tersedia.
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar pengguna.
 *       400:
 *         description: Gagal mendapatkan daftar pengguna.
 */
  router.post('/product', authenticate, create);
  router.get('/product', authenticate, findAll);
  router.get('/product/:id', authenticate, fineOneById);
  router.put('/product/:id', authenticate, updateById);
  router.delete('/product/:id', authenticate, deleteById);
};