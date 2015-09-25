module.exports = function(angular,config){

	return function(){
		var construct = function(){

			this.sequences = [];
		}


		var p = construct.prototype;

		p.add = function(actions,onComplete){
			var sequence = {
				cooldown:0,
				paused:false,
				destroyed:false,
				actions:actions,
				onComplete:onComplete,
			};
			this.sequences.push(sequence);
			return sequence;
		}

		p.update = function(elapsed){

			for(var i=0,c=this.sequences.length;i<c;i++){
				var sequence = this.sequences[i];
				if(sequence.paused)continue;
				if (sequence.cooldown <= 0) {
					var action = sequence.actions.shift();
					if (action != null) {
						// si _cooldown > 0 : joue aprés x frames
						// si _cooldown == 0 : joué immadiatement
						// si _cool down < 0 : mise en pause

						sequence.cooldown = parseInt(action());
						if (sequence.cooldown < 0) {
							sequence.paused = true;
						}
					}else {
						sequence.destroyed = true;
					}
				}else {
					sequence.cooldown -= elapsed;
				}
				if(sequence.destroyed){
					this.sequences.splice(i, 1);
					if(sequence.onComplete)sequence.onComplete();
					c--;
					i--;
				}
			}

		}


	 	var sequences = new construct();

	 	return sequences;
	}
}