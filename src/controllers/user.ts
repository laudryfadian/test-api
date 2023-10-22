import { random, authentication } from '../helpers/crypto';
import { createUser, getUserByEmail, updateUserById } from '../db/users';
import { failed, success } from '../helpers/responses';
import { generateToken } from '../helpers/crypto';
import express from 'express';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return failed(res, 'Bad Request', null, 400)
    }

    const checkEmail = await getUserByEmail(email)
    if (checkEmail) {
      return failed(res, 'Email Already Exist', null, 400)
    }

    const salt = random();

    const user = await createUser({name, email, salt, password: authentication(salt, password)});

    return success(res, 'Successfull', user)
  } catch (error) {

    return failed(res, error, null, 400)
  }
}

export const signIn = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return failed(res, 'Bad Request', null, 400)
    }

    const checkUser = await getUserByEmail(email)
    if (!checkUser) {
      return failed(res, 'Email Not Registered', null, 400)
    }

    const hash = authentication(checkUser.salt, password)
    if (checkUser.password != hash) {
      return failed(res, 'Unautorized', null, 401)
    }

    const salt = random();

    checkUser.salt = salt;
    checkUser.password = authentication(salt, password);

    const user = await updateUserById(checkUser.id, checkUser);
    
    const token = generateToken({id: user.id, email: user.email});

    return success(res, 'Successfull', { token: token })
  } catch (error) {

    return failed(res, error, null, 400)
  }
}