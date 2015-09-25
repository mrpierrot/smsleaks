
module.exports = {
    name:'game',
    states: {
        "game-chat": {
            route: {
                url: '/game',
                views:{
                    main:{
                        controller: 'GameChatCtrl',
                        template: require('./states/chat/chat.tpl.html')
                    }
                }
            },
            module:require('./states/chat/controller')
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