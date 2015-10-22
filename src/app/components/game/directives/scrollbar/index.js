module.exports = function(angular,config){
	return function($rootScope){
		return {
			link:function link(scope, element, attrs) { 
				element.mCustomScrollbar({
	                autoHideScrollbar: true,
	                theme: 'minimal-dark',
	                advanced:{
	                    updateOnContentResize: true
	                }
	            });

	            var container = element.find('.mCSB_container');
				$rootScope.$on('scrollbar.goToBottom',function(){

					setTimeout(function(){
							element.mCustomScrollbar("scrollTo","bottom",{
    						scrollInertia:500
						});
					},100);
					
				});

			}
		}
	}
}