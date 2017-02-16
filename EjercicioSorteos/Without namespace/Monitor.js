
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