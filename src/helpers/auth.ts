import { Request, Response, NextFunction } from 'express';
import { failed } from './responses'
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import Boom from '@hapi/boom';
import { config } from '../config'

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return failed(res, 'Unauthorized', null, 401)
  }
  
  const tokenParts = token.split(' ');
  
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return failed(res, 'Unauthorized', null, 401);
  }
  
  const tokenValue = tokenParts[1];
  
  try {
    const decoded = jwt.verify(tokenValue, config.jwt.secret);
    
    if (typeof decoded !== 'object') {
      return failed(res, 'Unauthorized', null, 401);
    }

    req.userId = decoded.id;

    next();

  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return failed(res, 'Token Expired', null, 401);

    } else if (err instanceof JsonWebTokenError) {
      return failed(res, 'Invalid Token', null, 401);

    } else {
      throw Boom.boomify(err);
      
    }
  }
};

export default authenticate;
