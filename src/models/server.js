import fileupload from 'express-fileupload';
import express    from 'express';
import http       from 'http';
import cors       from 'cors';
import { Server as Socket } from 'socket.io';
import { Sockets }  from './sockets.js';
import { DBConnection }  from '../database/config.js';
import { routerAuth, routerMessages }  from '../routes/index.js';

export class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 4000;
        this.server = http.createServer( this.app );
        this.io = new Socket( this.server );
        
        DBConnection();
        this.middlewares();
        this.routes();
        this.configSockets();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(fileupload({useTempFiles: true, tempFileDir: '/tmp/'}));
    }
    
    routes() {
        this.app.use('/api/auth', routerAuth);
        this.app.use('/api/messages', routerMessages);
    }

    configSockets() {
        new Sockets( this.io );
    }

    execute() {
        this.server.listen( this.port );
        console.log('Server in port:', this.port );
    }
}
