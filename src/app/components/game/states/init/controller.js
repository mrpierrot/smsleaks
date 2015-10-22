module.exports = module.exports = function(angular,config){
    return function ($scope,preloader,$state) {
    	preloader.start({
            "story":"/assets/data/story.json"
    	},function(result) {
            var data = {
                "actors" : result.story.actors
            };
            for(var act in result.story.acts){
                data["acts/"+act] = result.story.acts[act];
            }
            preloader.start(data,function(){
                $state.go('game-home');  
            });
    	});

    }

}