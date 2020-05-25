const socketio =require('socket.io');
const io = socketio();

const socketApi = {};
socketApi.io=io;

const users =[ ];

io.on('connection',(socket)=>{
    console.log("user connected socket");

    socket.on('newUser',(data)=>{
        const defaultData ={
            id:socket.id,
            position:{
                x:0,
                y:0
            }
        };

        const userData = Object.assign(data,defaultData);
        users.push(userData);
        socket.broadcast.emit('userConnectToRoom',userData);
        
    });
});

module.exports=socketApi;