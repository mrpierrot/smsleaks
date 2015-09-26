module.exports = module.exports = function(angular,config){
    return function ($scope,$state) {

    	$scope.play = function(){
    		$state.go('game-chat');
    	}
    }

}