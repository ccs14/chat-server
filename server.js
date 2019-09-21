const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.send({ response: `Server is up and running at: ${new Date().toLocaleString()}` }).status(200);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // message event
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('group-message', msg);
    });

    // disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('user disconnected');
    });
});

server.listen(3001, () => {
    console.log("listening on port", 3001);
});