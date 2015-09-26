module.exports = module.exports = function(angular,config){
    return function ($scope,preloader,$state) {
    	preloader.start({
    		"act01":"/assets/data/act01.json",
    		"act02":"/assets/data/act02.json"

    	},function(result) {
    		$state.go('game-chat');
    	});

    }

}