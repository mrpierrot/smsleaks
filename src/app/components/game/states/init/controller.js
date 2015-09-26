module.exports = module.exports = function(angular,config){
    return function ($scope,preloader,$state) {
    	preloader.start({
    		"actors":"/assets/data/actors.json",
    		"act01":"/assets/data/fr/act01.json",
    		"act02":"/assets/data/fr/act02.json",
    		"act03":"/assets/data/fr/act03.json",
    		"act04":"/assets/data/fr/act04.json"

    	},function(result) {
    		$state.go('game-home');
    	});

    }

}