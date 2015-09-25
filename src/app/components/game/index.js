module.exports = function (angular) {
    var config =  require('./config');

   var module =  angular.module(config.name, [
            'ui.router',
            'ui.bootstrap'
        ])
    .config(function ($stateProvider) {
        for(var key in config.states){
            $stateProvider.state(key,config.states[key].route);
        }

    });
    
    for(var key in config.services) {

        module.factory(key,config.services[key](angular, config))
    }
    for(var key in config.directives) {

        module.directive(key,config.directives[key](angular, config))
    }
    for(var key in config.states) {

        module.controller(config.states[key].route.views.main.controller, config.states[key].module(angular, config))
    }


    return module.name; 
}

