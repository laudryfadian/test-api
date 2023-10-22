import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  cors: {
    credentials: true,
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