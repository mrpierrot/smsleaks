module.exports = function(angular,config){
	return function($http){

   
                var total = 0;
                var progress = 0;
                var map = {};
                var onCompleteCallback;

                var makeResult = function(name){
                        return function(result){
                               map[name] = result.data;
                               progress++;
                               if(progress>=total){
                                        if(onCompleteCallback)onCompleteCallback(map);
                               }
                        }
                }

                var start = function(assets,onComplete){
                        total = 0;
                        progress = 0;
                        for(var name in assets){
                                total++;
                                $http.get(assets[name]).then(makeResult(name));

                        }
                        onCompleteCallback = onComplete;
                }

                

               
              
              
        	return {
        		start:start,
                        data:map
        	}


		
	}
}