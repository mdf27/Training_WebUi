function Revenge(name, drawInterval){
	BallsBag.call(this, name, 44, 5, drawInterval);
}

Revenge.prototype = Object.create(BallsBag.prototype);
Revenge.prototype.constructor = Revenge;