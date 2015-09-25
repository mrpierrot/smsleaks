
(function(){
    var angular = require('angular');
	require('angular-bootstrap');
    angular.module('smsleaks', [
        //'templates',
        'ui.bootstrap',
        require('angular-route'),
        require('./components/game')(angular)
    ]).config(function ($stateProvider, $urlRouterProvider) {  
        $urlRouterProvider.otherwise('/game');  
    });
})();

