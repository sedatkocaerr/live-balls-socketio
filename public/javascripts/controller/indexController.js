app.controller('indexController', ['$scope','indexFactory', ($scope,indexFactory) => {
    
    const connectionoptions = { 
        reconnectionAttemps:3,
        recconnectionDela:600,
    };

    indexFactory.connectSocket("http://localhost:3000",connectionoptions)
    .then((socket) => {
        console.log('bağlantı gerçekleşti.',socket);
    }).catch((err) => {
        console.log(err);
    });

}]);