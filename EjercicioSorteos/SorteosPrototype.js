
var myApp = (function (){
	function BallsBag(name, ballsCount, drawLength, drawInterval) {
		this.raffleName = name;
		this.balls = [];
		this.drawBallsAvailable = ballsCount;
		this.drawLength = drawLength;
		this.drawInterval = drawInterval;
		this.intervalDrawId = null;
		this.raffleBalls = [];	
	}

	BallsBag.prototype.loadBallsBag = function() {
		for (var i = 1; i <= this.drawBallsAvailable; i++) {
					this.balls.push(i);
				}

		return this.balls;
	};

	BallsBag.prototype.pickBallFromBag = function(){
		var currentBall, 
			currentBallIndex = Math.floor(Math.random() * this.balls.length);
		currentBall = this.balls[currentBallIndex];
		this.balls.splice(this.balls.indexOf(currentBall), 1);
		this.raffleBalls.push(currentBall);
	};

	BallsBag.prototype.showDrawStatus = function(raffleName) {
		var status = [], value;
		for (var i = 0; i < this.drawLength; i++) {
					value = (typeof this.raffleBalls[i] != 'undefined') ? this.raffleBalls[i] : '-';
					status.push(value);
		}
		console.log(raffleName + ': ' + status);
	};

	BallsBag.prototype.raffle = function(){
		this.intervalDrawId = setInterval(
		function(){
			this.pickBallFromBag();
			if (this.raffleBalls.length == this.drawLength){
				clearInterval(this.intervalDrawId);

				this.intervalDrawId = null;
			}
		}.bind(this), this.drawInterval);
	};

	BallsBag.prototype.start = function(){
		this.loadBallsBag();
		this.raffle();		
	};

	function Monitor(intervalMonitor){
		this.interval = intervalMonitor;
	}

	Monitor.prototype.monitoring = function(raffles){
	var endedRaffles = [];
	this.intervalMonitorId = setInterval(
		function () {
			for (var i = 0; i < raffles.length; i++ ){
				raffles[i].showDrawStatus(raffles[i].raffleName);
				if (raffles[i].intervalDrawId === null){
					if (endedRaffles.indexOf(raffles[i].raffleName ) < 0)
					   endedRaffles.push(raffles[i].raffleName);
				}
			}
			console.log('---------------------------');
			if ( endedRaffles.length == raffles.length ){
					clearInterval(this.intervalMonitorId);
			}
			
		}.bind(this), this.monitorInterval);
	};

	function Gold(name, drawInterval){
		BallsBag.call(this, name, 44, 6, drawInterval);
	}

	Gold.prototype = Object.create(BallsBag.prototype);
	Gold.prototype.constructor = Gold;

	function Revenge(name, drawInterval){
		BallsBag.call(this, name, 44, 5, drawInterval);
	}

	Revenge.prototype = Object.create(BallsBag.prototype);
	Revenge.prototype.constructor = Revenge;

	return {
		Gold : Gold,
		Revenge : Revenge,
		Monitor : Monitor
	};
})();

var testMyApp = (function(){
	var gold = new myApp.Gold('oro',5000);
	var revenge = new myApp.Revenge('revenge',5000);
	gold.start();
	revenge.start();
	var monitor = new myApp.Monitor(20000);
	var raffles = [gold, revenge];
	monitor.monitoring(raffles);
});
testMyApp();