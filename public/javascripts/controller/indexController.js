app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages=[];
    $scope.players={};
    $scope.init = () => {
        const username = prompt('please enter the username ');

        if (username)
            initsocket(username);
        else
            return false;
    };

    function initsocket(username) {
        const connectionoptions = {
            reconnectionAttemps: 3,
            recconnectionDela: 600,
        };

        indexFactory.connectSocket("http://localhost:3000", connectionoptions)
            .then((socket) => {
                socket.emit('newUser',{username});

                socket.on('userConnectToRoom',(data)=>{
                    const messageData = {
                        type:0,// message type info
                        username:data.username,
                        messagetext:"user is connect"
                    };
                    $scope.messages.push(messageData);
                    $scope.players[data.id]=data;
                    $scope.$apply();


                });

                socket.on('playerdata',(players)=>{
                    
                    $scope.players=players;
                    $scope.$apply();
                });

                socket.on('userDisconnectToRoom',(data)=>{
                    const messageData = {
                        type:0,// message type info
                        username:data.username,
                        messagetext:"user is disconnect"
                    };
                    $scope.messages.push(messageData);
                    delete $scope.players[data.id];
                    $scope.$apply();
                });

                let animate=false;
                $scope.onclickPlayer = ($event)=>{
                    if (!animate)
                        animate=true;
                        const changedata ={
                            id:socket.id,
                            position:{
                                x:$event.offsetX,
                                y:$event.offsetY
                            }
                        };
                        socket.emit('userchangeposition',changedata);
                         $("#"+socket.id).animate({'left':$event.offsetX,'top':$event.offsetY},()=>{
                            
                            animate=false;
                        });
                    };

                socket.on('userchangepositiondata',(data)=>{
                     $("#"+data.id).animate({'left':data.position.x,'top':data.position.y},()=>{
                    });
                });

            }).catch((err) => {
                console.log(err);
            });
    }

}]);