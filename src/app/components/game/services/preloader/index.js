module.exports = function(angular,config){
	return function($http){

   
                var total = 0;
                var progress = 0;
                var onCompleteCallback;

                var ret =  {
                        ready:false,
                        data:{}
                }
              


                var makeResult = function(name){
                        return function(result){
                               ret.data[name] = result.data;

                               progress++;
                               if(progress>=total){
                                        ret.ready = true;
                                        if(onCompleteCallback)onCompleteCallback(ret.data);
                               }
                        }
                }

                var start = function(assets,onComplete){
                        total = 0;
                        progress = 0;
                        ret.ready = false;
                        for(var name in assets){
                                total++;
                                $http.get(assets[name]).then(makeResult(name));

                        }

                        onCompleteCallback = onComplete;
                }

                
                ret.start = start;

		return ret;
	}
}