const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.send({ response: `Server is up and running at: ${new Date().toLocaleString()}` }).status(200);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // message event
    socket.on('message', (msg) => {
        // log each message
        console.log("message: ", msg)
        console.log(`user: ${msg.user} ; message: ${msg.message}`);

        // TODO: add message to db here

        // pass message object to other clients
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