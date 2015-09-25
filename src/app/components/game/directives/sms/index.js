
module.exports = function(angular,config){
	return function(){
		return {
			template:require('./sms.tpl.html'),
			replace: true,
			scope: { data: '=' }
		}
	}
}