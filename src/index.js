import 'dotenv/config.js';
// import dotenv from 'dotenv';
import { Server } from './models/index.js';

// dotenv.config();
const server = new Server();
server.execute();


