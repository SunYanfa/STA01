const { WebSocket, WebSocketServer } = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});


//-----------------------------------------------------------

// I'm maintaining all active connections in this object
const clients = {};

function broadcastMessage(json) {
    // We are sending the current data to all connected clients
    const data = JSON.stringify(json);
    for (let userId in clients) {
        let client = clients[userId];
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    };
}

let mensaje;

wsServer.on('connection', function (connection) {

    const userId = uuidv4();
    clients[userId] = connection;

    console.log('Se ha conectado un cliente, Su id es: ');
    console.log(userId);


    if (mensaje !== null){
        connection.send(JSON.stringify(mensaje));
    }

    connection.on('message', (message) => {
        const dataFromClient = JSON.parse(message.toString());
        // console.log(dataFromClient);
        broadcastMessage(dataFromClient);
        mensaje = dataFromClient;
    });
});