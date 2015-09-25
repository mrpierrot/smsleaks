module.exports = function(angular,config){

	return function($interval){

		var construct = function(){
			this.all = [];
			this._lastTime = 0;
			this.paused = false;
			this.interval = 1000/60;
			this.stop = null;

		}

		var p = construct.prototype;



		/**
		 *
		 * @param states ( init, update, destruct )
		 */
		p.add = function(states,priority,lifetime,name){

			var process = {
				name:name || 'process-'+Date.now(),
				priority: priority || 0,
				states:states,
				lifetimeInit:lifetime || -1,
				lifetime:lifetime || -1,
				paused:false,
				destroyed:false
			}

			var i = this.all.length - 1;
			while(i>=0){
				if (this.all[i].priority <= priority) {
					this.all.splice(i, 0, process);
					break;
				}
				i--;
			};
			if (i < 0) {
				this.all.push(process);
			}
			if(process.states.init)process.states.init(process);
			return process;

		}

		p.start = function(){
        	this._lastTime = Date.now();
        	var self = this;
			this.stop = $interval(function(){self.update()},this.interval);
        }

        p.stop = function(){
			$interval.cancel(this.stop);
        }

		p.update = function(){
			var newTime = Date.now();
			var deltaTime = newTime - this._lastTime;
			if(!this.paused){
				var i, c = this.all.length;
				var process;
				for (i = 0; i < c; i++) {
					process = this.all[i];
					if (!process.destroyed) {
						if (process.paused) continue;
						if(process.states.update)process.states.update(deltaTime);
						if (process.lifetime >= 0) {
							process.lifetime--;
							if (process.lifetime <= 0) {
								process.destroyed = true;
							}
						}
					}
					if (process.destroyed) {
						if(process.states.destruct)process.states.destruct(process);
						this.all.splice(i, 1);
						c--;
						i--;
					}
				}
			}
			this._lastTime = newTime;
		}

	 	var processes = new construct();

	 	return processes;
	}
}