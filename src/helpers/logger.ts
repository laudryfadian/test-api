import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

morgan.token('custom', (req: Request, res: Response) => {  
  return JSON.stringify({
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    idUser: req.userId,
  });
});

const requestLogger = morgan(':custom');

export default requestLogger;
