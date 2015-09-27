module.exports = module.exports = function(angular,config){
    return function ($scope,$state,preloader) {

    	if(!preloader.ready){
            $state.go("game-init");
            return;
        }

    	$scope.play = function(){
    		$state.go('game-chat');
    	}
    }

}