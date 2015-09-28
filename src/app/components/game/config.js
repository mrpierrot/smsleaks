
module.exports = {
    name:'game',
    states: {
         "game-init": {
            route: {
                url: '/init',
                views:{
                    main:{
                        controller: 'GameInitCtrl',
                        template: require('./states/init/init.tpl.html')
                    }
                }
            },
            module:require('./states/init/controller')
        },
         "game-home": {
            route: {
                url: '/home',
                views:{
                    main:{
                        controller: 'GameHomeCtrl',
                        template: require('./states/home/home.tpl.html')
                    }
                }
            },
            module:require('./states/home/controller')
        },
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
        },
        "game-gameover": {
            route: {
                url: '/gameover',
                views:{
                    main:{
                        controller: 'GameGameOverCtrl',
                        template: require('./states/gameover/gameover.tpl.html')
                    }
                }
            },
            module:require('./states/gameover/controller')
        }
    },
    services:{
        "preloader":require('./services/preloader'),
        "processes":require('./services/processes'),
        "sequences":require('./services/sequences'),
        "engine":require('./services/engine')
    },
    directives:{
        "sms":require('./directives/sms'),
        "response":require('./directives/response'),
        "chatScrollbar":require('./directives/scrollbar')
    }
};