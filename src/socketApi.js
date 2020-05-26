const socketio =require('socket.io');
const io = socketio();

const socketApi = {};
socketApi.io=io;

const users ={};
const messages=[];

// helpers
const randomColor = require("../helpers/randomcolor");
io.on('connection',(socket)=>{
    console.log("user connected socket");

    socket.on('newUser',(data)=>{
        const defaultData ={
            id:socket.id,
            position:{
                x:0,
                y:0
            },
            color:randomColor()
        };
        const userData = Object.assign(data,defaultData);
        users[socket.id] = userData;
        socket.broadcast.emit('userConnectToRoom',userData);
        socket.emit('playerdata',users);
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit("userDisconnectToRoom",users[socket.id]);
        delete users[socket.id];
    });

    socket.on('userchangeposition',(data)=>{

        users[socket.id].position.x=data.position.x;
        users[socket.id].position.y=data.position.y;
        socket.broadcast.emit("userchangepositiondata",users[socket.id]);
    });

    socket.on('newMessageuser',(data)=>{
        data.id=socket.id;
        messages.push(data);
        socket.broadcast.emit("messageuseradd",data);
    });
});


module.exports=socketApi;