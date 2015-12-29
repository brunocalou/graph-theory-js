/**@module util */

/**
 * Timer class
 * @class
 * @classdesc Class used to measure an elapsed time
 */
function Timer () {
    /**type {number} */
	this.initial_time = process.hrtime();
}

/**
 * Starts the timer
 */
Timer.prototype.start = function () {
	this.initial_time = process.hrtime();
};

/**
 * Gets the elapsed time in nanoseconds
 * @returns {number} The elapsed time in nanoseconds
 */
Timer.prototype.getElapsedTimeNano = function () {
	var diff = process.hrtime(this.initial_time);
	return diff[0] * 1e9 + diff[1];
};

/**
 * Gets the elapsed time in microseconds
 * @returns {number} The elapsed time in microseconds
 */
Timer.prototype.getElapsedTimeMicro = function () {
	return this.getElapsedTimeNano() / 1000;
};

/**
 * Gets the elapsed time in milliseconds
 * @returns {number} The elapsed time in milliseconds
 */
Timer.prototype.getElapsedTimeMilli = function () {
	return this.getElapsedTimeNano() / 1000000;
};

/**
 * Gets the elapsed time in seconds
 * @returns {number} The elapsed time in seconds
 */
Timer.prototype.getElapsedTime = function () {
	return this.getElapsedTimeNano() / 1000000000;
};

/**
 * Prints the elapsed time in nanoseconds
 */
Timer.prototype.printElapsedTimeNano = function () {
	console.log(this.getElapsedTimeNano() + ' ns');
};

/**
 * Prints the elapsed time in microseconds
 */
Timer.prototype.printElapsedTimeMicro = function () {
	console.log(this.getElapsedTimeNano() / 1000 + ' us');
};

/**
 * Prints the elapsed time in milliseconds
 */
Timer.prototype.printElapsedTimeMilli = function () {
	console.log(this.getElapsedTimeNano() / 1000000 + ' ms');
};

/**
 * Prints the elapsed time in seconds
 */
Timer.prototype.printElapsedTime = function () {
	//Print the time in seconds
	console.log(this.getElapsedTimeNano() / 1000000000 + ' s');
};
module.exports = Timer;