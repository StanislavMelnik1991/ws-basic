import http from 'http';
import path from 'path';
import { stdout } from 'process';
import cors from 'cors';
import express from 'express';
import { SocketServer } from './websocket';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

const server = http.createServer(app).listen(process.env.WS_PORT, () => stdout.write(`WS server started on port ${process.env.WS_PORT}`));

new SocketServer(server);
