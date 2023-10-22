import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import requestLogger from './helpers/logger';
import { config } from './config';
import specs from './docs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import { dbConn } from './db/connection';

const app = express();

app.use(cors(config.cors));

app.use(requestLogger);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
dbConn();

const server = http.createServer(app)

server.listen({port: config.port, hostname: '0.0.0.0'}, () => {
  console.log('server is running on http://localhost:'+config.port);
});
