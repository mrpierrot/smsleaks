module.exports = function(angular,config){
	return function($interval,sequences,processes){

        var tweaks = require('../../../../data/tweaks.json');
        var story = require('../../../../data/story.json');
        var actors = require('../../../../data/actors.json');
        var player = "france";
        var dictionnary = {};
        
        var currentActName = null;
        var currentAct = null;
        var currentSequenceIndex = 1;
        var currentSequence = null;

        var messagesDisplay = [];
        var responsesDisplay = [];

        processes.add(sequences);
       
        var start = function(){
        	processes.start();
        	changeAct("acte01");
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
        		messagesDisplay.push({user:actors[message.from],message:replaceStrings(message.text),sameUser:message.sameUser});
        		return (message.delay || tweaks.defaultMessageDelay)*1000;
        	}
        	
        }

        var nextSequence = function(index){
        	currentSequenceIndex = index;
        	currentSequence = currentAct.sequences[currentSequenceIndex];
        	var actions = [];
                var lastUser = null;
        	for(var i=0,c=currentSequence.messages.length;i<c;i++){
                        var msg = currentSequence.messages[i];
                        console.log(msg,lastUser);
                        if(msg.from == lastUser){
                                msg.sameUser = true;
                        }
        		actions.push(makeDisplaySequenceMessage(msg));
                        lastUser = msg.from;
        	}
        	sequences.add(actions,currentSequenceComplete)
        }

        var currentSequenceComplete = function(){
        	//console.log("currentSequenceComplete : ",currentSequence);
        	if(currentSequence['goto']){
        		goToParse(currentSequence['goto']);
        	}else if(currentSequence.responses){
        		for(var i=0,c=currentSequence.responses.length;i<c;i++){
        			currentSequence.responses[i].text = replaceStrings(currentSequence.responses[i].text);
                                responsesDisplay.push(currentSequence.responses[i]);
        		}
        	} 
        	
        }

        var selectResponse = function(data){
        	responsesDisplay.splice(0,responsesDisplay.length);
        	messagesDisplay.push({user:actors[player],message:replaceStrings(data.text)});

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
        }
      
		return {
			messages:messagesDisplay,
			responses:responsesDisplay,
			start:start,
			stop:stop,
			selectResponse:selectResponse
		}


		
	}
}