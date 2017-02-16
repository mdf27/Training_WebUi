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
