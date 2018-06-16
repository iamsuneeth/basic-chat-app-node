const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath))


io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.emit('newMessage', {
        from: "suneeth",
        text: "Hey, what's up",
        createdAt: new Date().getTime()
    });
    
    socket.on('createMessage', (message) => console.log(message));
});

server.listen(port, () => {
    console.log('listening on 3000');
})