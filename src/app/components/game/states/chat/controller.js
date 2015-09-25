module.exports = module.exports = function(angular,config){
    return function ($scope,$interval,engine) {

       engine.start();  

       $scope.messages = engine.messages;
       $scope.responses = engine.responses;
    }

}