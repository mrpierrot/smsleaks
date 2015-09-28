module.exports = module.exports = function(angular,config){
    return function ($scope,$interval,engine,preloader,$state,$animate,$rootScope) {

        if(!preloader.ready){
            $state.go("game-init");
            return;
        }

       engine.start();  

       engine.scope.$on('showResponses',function(){
       		$scope['continue'] = engine.scope.playerContinue;
       		$scope.showResponses = true;
          console.log('showResponses');
       		scrollToBottom();

       });

       engine.scope.$on('hideResponses',function(){
       		$scope['continue'] = engine.scope.playerContinue;
       		$scope.showResponses = false;
       		scrollToBottom();
       });


        var scrollToBottom = function(){
        	//var initValue = document.body.scrollHeight;
        	 $scope.$evalAsync(function() {

        		 /*$('html, body').animate( { scrollTop: document.body.scrollHeight}, 1000 );*/
              $rootScope.$emit('scrollbar.goToBottom');
        	});
          
         
        }

       $scope.messages = engine.messages;
       $scope.responses = engine.responses;

       $scope.$watch('messages',scrollToBottom,true);

    }

}