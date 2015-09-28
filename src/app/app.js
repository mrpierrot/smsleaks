
(function(){
    var angular = require('angular');
	require('angular-bootstrap');
    require('angular-animate');
    require('malihu-custom-scrollbar-plugin')($);

    //var gsap = require('gsap');
    angular.module('smsleaks', [
        //'templates',
        'ui.bootstrap',
        'ngAnimate',
        require('angular-route'),
        require('./components/game')(angular)
    ]).config(function ($stateProvider, $urlRouterProvider) {  
        $urlRouterProvider.otherwise('/init');  
    });
})();

