var Timer = function () {
	this.initial_time = process.hrtime();
}

Timer.prototype.start = function () {
	this.initial_time = process.hrtime();
};

Timer.prototype.getElapsedTimeNano = function () {
	//Get the time in nano seconds
	var diff = process.hrtime(this.initial_time);
	return diff[0] * 1e9 + diff[1];
};

Timer.prototype.getElapsedTimeMicro = function () {
	return this.getElapsedTimeNano() / 1000;
};

Timer.prototype.getElapsedTimeMilli = function () {
	return this.getElapsedTimeNano() / 1000000;
};

Timer.prototype.getElapsedTime = function () {
	//Print the time in seconds
	return this.getElapsedTimeNano() / 1000000000;
};

Timer.prototype.printElapsedTimeNano = function () {
	console.log(this.getElapsedTimeNano() + ' ns');
};

Timer.prototype.printElapsedTimeMicro = function () {
	console.log(this.getElapsedTimeNano() / 1000 + ' us');
};

Timer.prototype.printElapsedTimeMilli = function () {
	console.log(this.getElapsedTimeNano() / 1000000 + ' ms');
};

Timer.prototype.printElapsedTime = function () {
	//Print the time in seconds
	console.log(this.getElapsedTimeNano() / 1000000000 + ' s');
};
module.exports = Timer;