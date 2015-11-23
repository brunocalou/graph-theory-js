var Timer = function () {
	this.initial_time = Date.now();
}

Timer.prototype.start = function () {
	this.initial_time = Date.now();
};

Timer.prototype.getElapsedTime = function () {
	return Date.now() - this.initial_time;
};

Timer.prototype.printElapsedTime = function () {
	console.log(Date.now() - this.initial_time + ' ms');
};

module.exports = Timer;