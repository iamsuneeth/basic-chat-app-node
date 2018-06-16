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

    socket.on('createMessage', (message) =>{
        io.emit('newMessage', {
            from: message.from,
            text:message.text,
            createdAt:new Date().createdAt
        })
    });

    socket.emit('newMessage', {
        from:'admin',
        text:'welcome to chat group'
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'new user joined'
    })

    console.log('new user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log('listening on 3000');
})