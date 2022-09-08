import { verifyJWT } from "../middlewares/index.js";
import { getUsers, saveMessage, userConnected, userDisconnected } from "../controllers/sockets.js";

export class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async ( socket ) => { 
            //Validar JWT, si el token no es valido desconectar
            const [ valid, uid ] = verifyJWT( socket.handshake.query['access-token'] );
            if ( !valid ) return socket.disconnect();
 
            //Saber que usuario esta activo por UID
            await userConnected( uid );

            //Emitir todos los usuarios conectados
            this.io.emit('list-users', await getUsers());

            //Socket join, UID
            socket.join(uid);

            //Escuchar couando un cliente manda un mensaje, (mensaje personal)
            socket.on('personal-message', async (payload) => {
                const message = await saveMessage(payload);
                this.io.to(payload.to).emit('personal-message', message)
                this.io.to(payload.from).emit('personal-message', message)
            })
            
            //Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                await userDisconnected( uid );
                //Disconnect, masrcar en la DB que el usuario se desconecto
                this.io.emit('list-users', await getUsers());
            })
        });
    }
}