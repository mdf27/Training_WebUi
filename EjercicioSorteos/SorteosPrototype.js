
myApp = (function (){
	function BallsBag(name, ballsCount, drawLength, drawInterval) {
		this.raffleName = name;
		this.balls = new Array();
		this.drawBallsAvailable = ballsCount;
		this.drawLength = drawLength;
		this.drawInterval = drawInterval;
		this.intervalDrawId;
		this.raffleBalls = new Array();	
	};

	BallsBag.prototype.loadBallsBag = function() {
		for (var i = 1; i <= this.drawBallsAvailable; i++) {
					this.balls.push(i);
				};

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
		var status = new Array(), value;
		for (var i = 0; i < this.drawLength; i++) {
					value = (typeof this.raffleBalls[i] != 'undefined') ? this.raffleBalls[i] : '-';
					status.push(value);
		};
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
	};

	Monitor.prototype.monitoring = function( raffles ){
	var endedRaffles = new Array;
	this.intervalMonitorId = setInterval(
		function () {
			for (var i = 0; i < raffles.length; i++ ){
				raffles[i].showDrawStatus(raffles[i].raffleName)
				if (raffles[i].intervalDrawId == null){
					if (endedRaffles.indexOf(raffles[i].raffleName ) < 0)
					endedRaffles.push(raffles[i].raffleName)
				}
			}
			console.log('---------------------------');
			if ( endedRaffles.length == raffles.length ){
					clearInterval(this.intervalMonitorId);
			}
			
		}.apply(this),this.monitorInterval);
	}

	return {
		BallsBag : BallsBag,
		Monitor : Monitor
	};
})();

testMyApp = (function(){
	var gold = new myApp.BallsBag('oro',44,6,5000);
	var revenge = new myApp.BallsBag('revenge',44,5,5000);
	gold.start()
	revenge.start()
	var monitor = new myApp.Monitor(20000);
	var raffles = [gold, revenge]
	monitor.monitoring(raffles);
});
