const net = require('net');
const port = 3000;
const host = '127.0.0.1';

const server = net.createServer();
server.listen(port, host, () => {
    console.log(`Server is running on port ${port}.`);
});


let sockets = [];

server.on('connection', function (sock) {
    console.log(`CONNECTED => ${sock.remoteAddress}:${sock.remotePort}`);
    sockets.push(sock);

    sock.on('data', function (data) {
        console.log(`Data From ${sock.remoteAddress}:${sock.remotePort} => ${data}`);
        sockets.forEach(socket => {
            sock.write(`Data received from ${socket.remoteAddress}:${socket.remotePort} => ${data}`);
        });
    });

    sock.on('close', function (data) {
        let index = sockets.findIndex(function (i) {
            return i.remoteAddress === sock.remoteAddress && i.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log(`CONNECTION CLOSED => ${sock.remoteAddress}:${sock.remotePort}`);
    });
});