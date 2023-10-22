import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config'


export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(config.secret.encrypt).digest('hex');
}
export const generateToken = (payload: any) => {
  const token = jwt.sign(payload, config.jwt.secret, config.jwt.sign);  

  return token;
};
