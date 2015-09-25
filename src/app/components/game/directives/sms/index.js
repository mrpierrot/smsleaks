
module.exports = function(angular,config){
	return function(){
		return {
			template:require('./sms.tpl.html'),
			scope: { data: '=' }
		}
	}
}