var testMyApp = (function(){
	var gold = new Gold('oro',5000);
	var revenge = new Revenge('revenge',5000);
	gold.start();
	revenge.start();
	var monitor = new Monitor(20000);
	var raffles = [gold, revenge];
	monitor.monitoring(raffles);
});