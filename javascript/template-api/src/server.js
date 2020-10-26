import http from 'http';
import app from './app';
import { websocketConfig } from './config/websocket';

const server = http.Server(app);

websocketConfig(server);

server.listen(3333);
