import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import requestLogger from './helpers/logger';
import { config } from './config';
import specs from './docs/swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors(config.cors));

app.use(requestLogger);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


const server = http.createServer(app)

mongoose.Promise = Promise;
mongoose.connect(config.db.connectionString);
mongoose.connection.on('error', (error: Error) => console.log(error));

server.listen(8080, () => {
  console.log('server running on http://localhost:8080/')
});
