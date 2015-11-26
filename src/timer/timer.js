var Timer = function () {
	this.initial_time = process.hrtime();
}

Timer.prototype.start = function () {
	this.initial_time = process.hrtime();
};

Timer.prototype.getElapsedTime = function () {
	//Get the time in nano seconds
	var diff = process.hrtime(this.initial_time);
	return diff[0] * 1e9 + diff[1];
};

Timer.prototype.printElapsedTimeNano = function () {
	console.log(this.getElapsedTime() + ' ns');
};

Timer.prototype.printElapsedTimeMicro = function () {
	console.log(this.getElapsedTime() / 1000 + ' us');
};

Timer.prototype.printElapsedTimeMilli = function () {
	console.log(this.getElapsedTime() / 1000000 + ' ms');
};

Timer.prototype.printElapsedTime = function () {
	//Print the time in seconds
	console.log(this.getElapsedTime() / 1000000000 + ' s');
};
module.exports = Timer;