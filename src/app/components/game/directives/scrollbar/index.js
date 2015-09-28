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
					console.log('scroll bot',container.height());

					setTimeout(function(){
						console.log('scroll bot 2',container.height());
							element.mCustomScrollbar("scrollTo","bottom",{
    						scrollInertia:500
						});
					},100);
					
				});

			}
		}
	}
}