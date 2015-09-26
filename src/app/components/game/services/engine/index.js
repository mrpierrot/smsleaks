module.exports = function(angular,config){
	return function($interval,preloader,sequences,processes,$rootScope){

                var tweaks = require('../../../../data/tweaks.json');
                var actors = {};
                var story = {};
                var player = "france";
                var dictionnary = {};
                var scope = $rootScope.$new();
                
                var currentActName = null;
                var currentAct = null;
                var currentSequenceIndex = 1;
                var currentSequence = null;

                var messagesDisplay = [];
                var responsesDisplay = [];
                var responsesEnabled = false;
                var lastUserWrite = null;

                processes.add(sequences);
               
                var start = function(){
                        story = {
                                "act01":preloader.data["act01"],
                                "act02":preloader.data["act02"]
                        };
                        actors = preloader.data["actors"];
                        for(var key in actors){
                                actors[key].id = key;
                        }
                	changeAct("act01");
                        processes.start();
                }

                var stop = function(){
                	processes.stop();
                }



                var changeAct = function(name,sequenceIndex){
                	currentActName = name;
                	currentAct = story[currentActName];
                	currentSequenceIndex = sequenceIndex || 1;
                	currentSequence = null;
                	nextSequence(currentSequenceIndex);
                }

                var makeDisplaySequenceMessage = function(message){
                	return function(){
                		messagesDisplay.push({user:actors[message.from],message:replaceStrings(message.text),sameUser:message.sameUser,align:message.from==player?"right":"left"});
                		return (message.delay || tweaks.defaultMessageDelay)*1000;
                	}
                	
                }

                var nextSequence = function(index){
                	currentSequenceIndex = index;
                	currentSequence = currentAct.sequences[currentSequenceIndex.toString()];
                	var actions = [function(){
                                return tweaks.defaultMessageDelay*1000;
                        }];
                	for(var i=0,c=currentSequence.messages.length;i<c;i++){
                                var msg = currentSequence.messages[i];
                                if(msg.from == lastUserWrite){
                                        msg.sameUser = true;
                                }
                		actions.push(makeDisplaySequenceMessage(msg));
                                lastUserWrite = msg.from;
                	}
                	sequences.add(actions,currentSequenceComplete)
                }

                var currentSequenceComplete = function(){
                	//console.log("currentSequenceComplete : ",currentSequence);
                        responsesDisplay.splice(0,responsesDisplay.length);
                	if(currentSequence['goto']){
                		goToParse(currentSequence['goto']);
                	}else if(currentSequence.responses){
                		for(var i=0,c=currentSequence.responses.length;i<c;i++){
                			currentSequence.responses[i].text = replaceStrings(currentSequence.responses[i].text);
                                        responsesDisplay.push(currentSequence.responses[i]);
                		}
                                responsesEnabled = true;
                                scope.$emit('showResponses');
                	} 
                	
                }

                var selectResponse = function(data){
                        if(responsesEnabled){
                                responsesEnabled = false;
                        	scope.$emit('hideResponses');
                        	messagesDisplay.push({user:actors[player],message:replaceStrings(data.text),align:"right",sameUser:lastUserWrite==player});
                                lastUserWrite = player;
                        	if(data.data){
                        		for(var key in data.data){
                        			dictionnary['%'+key+'%'] = data.data[key];
                        		}
                        	}
                        	var goTo = data['goto'];
                        	if(goTo){
                        		goToParse(data['goto']);
                        	}
                        }
                	
                }

                var goToParse = function(goTo){
                	//console.log("goTo : "+goTo);
        			if(goTo){
        				var type = typeof(goTo);
        				//console.log("type : "+type);
                		if(type == "number"){
                			nextSequence(goTo);
                		}else if(Array.isArray(goTo)){
                			if(goTo.length == 3){
                				// si condition 0 alors on va en 1 ou 2
                				eval("actors."+goTo[0])?goToParse(goTo[1]):goToParse(goTo[2]);
                			}else{
                				console.error("invalid goto : "+goTo);
                			}
                		}else if(type == "object"){
                			if(goTo.act && goTo.seq){
                				changeAct(goTo.act,goTo.seq)
                			}else{
                				console.error("invalid goto : "+goTo);
                			}
                		}else if(goTo == "end"){
                			gameOver();
                		}else{
                			console.error("invalid goto : "+goTo);
                		}
                	}else{
                		console.error("invalid goto : "+goTo);
                	}
                }

                var replaceStrings = function(text){
                	for(var key in dictionnary){
                		text = text.replace(key,dictionnary[key]);
                	}
                	return text;
                }




                var gameOver = function(){
                	console.log("game over");
                        scope.$emit('gameOver');
                }
              
        	return {
                        scope:scope,
        		messages:messagesDisplay,
        		responses:responsesDisplay,
        		start:start,
        		stop:stop,
        		selectResponse:selectResponse
        	}


        		
	}
}