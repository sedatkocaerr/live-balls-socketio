app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages=[];
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
                    };
                    $scope.messages.push(messageData);
                    $scope.$apply();
                });

            }).catch((err) => {
                console.log(err);
            });
    }

    
}]);