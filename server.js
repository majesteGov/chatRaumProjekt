const socketio = require('socket.io'); // to use socketio
const path = require('path'); //help of the path
const express = require('express'); //create a express server
const http = require('http'); // setup server to handle socketio
const formatMessage = require('./utils/messages'); //access to messages
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require ('./utils/users'); //access the user

const app = express(); //create a variable app
const server = http.createServer(app); // create a server variable, create servermethod
const io = socketio(server); //create a variable io

// static folder
app.use(express.static(path.join(__dirname, 'public'))); // access to file in public folder

// AdministratorName
const AdmiName = 'neuer Benutzer';
const AdmiName1 = 'Der Benutzer';

// Run client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);

        socket.join(user.room);

    // Welcome to user
    socket.emit('message', formatMessage `${user.username} Willkommen im Raum ...! `);

    // BrodCast user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(AdmiName, 
        ` ${user.username} hat den Raum betreten.`));
   
        //Send users info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
});

    // Listen for chatMes
    socket.on('chatMessage', (sms) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, sms));
    });
     // Runs client dis
     socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage(AdmiName1, 
                `${user.username} hat den Raum verlassen.`));
        
              //Send users info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
        }
    });
});

const PORT = 3000 || process.env.PORT; // create variable port or envirmt port ...
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));