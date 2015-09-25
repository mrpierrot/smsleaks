
module.exports = {
    name:'game',
    states: {
        "game-main": {
            route: {
                url: '/game',
                views:{
                    main:{
                        controller: 'GameMainCtrl',
                        template: require('./states/main/main.tpl.html')
                    }
                }
            },
            module:require('./states/main/controller')
        }
    },
    services:{
        "processes":require('./services/processes'),
        "sequences":require('./services/sequences'),
        "engine":require('./services/engine')
    },
    directives:{
        "sms":require('./directives/sms'),
        "response":require('./directives/response')
    }
};