
function BallsBag(name, ballsCount, drawLength, drawInterval) {
	this.raffleName = name;
	this.balls = new Array();
	this.drawBallsAvailable = ballsCount;
	this.drawLength = drawLength;
	this.drawInterval = drawInterval;
	this.intervalDrawId;
	this.raffleBalls = new Array();	
}

BallsBag.prototype.loadBallsBag = function() {
	for (var i = 1; i <= this.drawBallsAvailable; i++) {
				this.balls.push(i);
			};

	return this.balls;
}

BallsBag.prototype.pickBallFromBag = function(){
	var currentBall, 
		currentBallIndex = Math.round(Math.random() * this.balls.length);
	currentBall = this.balls[currentBallIndex];
	this.balls.splice(this.balls.indexOf(currentBall), 1);
	this.raffleBalls.push(currentBall);
}

BallsBag.prototype.showDrawStatus = function(raffleName) {
	var status = new Array(), value;
	for (var i = 0; i < this.drawLength; i++) {
				value = (typeof this.raffleBalls[i] != 'undefined') ? this.raffleBalls[i] : '-';
				status.push(value);
	};
	console.log(raffleName + ': ' + status);
}

BallsBag.prototype.raffle = function(){
	var self = this;
	self.intervalDrawId = setInterval(
	function(){
		self.pickBallFromBag();
		if (self.raffleBalls.length == self.drawLength){
			clearInterval(self.intervalDrawId);
			self.intervalDrawId = null;
		}
	}, self.drawInterval);
}

var myApp = function(){

}

myApp.prototype.monitoring = function(){
	var self = this;
	self.intervalMonitorId = setInterval(
		function () {
			self.showDrawStatus(self.raffleName);
			console.log('---------------------------');
			if (self.intervalDrawId == null){
				clearInterval(self.intervalMonitorId);
			}
		},self.monitorInterval);
}
var gold = new BallsBag('oro',44,6,5000);

