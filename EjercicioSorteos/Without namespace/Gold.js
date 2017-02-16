function Gold(name, drawInterval){
	BallsBag.call(this, name, 44, 6, drawInterval);
}

Gold.prototype = Object.create(BallsBag.prototype);
Gold.prototype.constructor = Gold;