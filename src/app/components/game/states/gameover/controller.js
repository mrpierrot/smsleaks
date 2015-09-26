module.exports = module.exports = function(angular,config){
    return function ($scope,$state) {
		$scope.replay = function(){
    		$state.go('game-init');
    	}

    }

}