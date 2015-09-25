module.exports = function(angular,config){
	return function(engine){
		return {
			template:require('./response.tpl.html'),
			scope: { data: '=' },
			replace: true,
			link:function link(scope, element, attrs) { 
				scope.click = function(){

					engine.selectResponse(scope.data);
				}
			}
		}
	}
}