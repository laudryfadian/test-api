import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  cors: {
    origin: '0.0.0.0',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  jwt: {
    secret: process.env.JWTSECRET,
    sign: {
      expiresIn: '60m',
    }
  },
  db: {
    connectionString: process.env.DB_URI,
  },
  secret: {
    encrypt: process.env.SECRET
  }
}