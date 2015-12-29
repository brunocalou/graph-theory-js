function Memory() {
	this.memory_usage = process.memoryUsage();
}

Memory.prototype.start = function () {
	this.memory_usage = process.memoryUsage();
};

Memory.prototype.getDiff = function (initial_usage, last_usage) {
	// Get the difference in bytes
	var diff = {};

	if (!initial_usage) initial_usage = this.memory_usage;
	if (!last_usage) last_usage = process.memoryUsage();

	diff.rss = last_usage.rss - initial_usage.rss;
	diff.heapTotal = last_usage.heapTotal - initial_usage.heapTotal;
	diff.heapUsed = last_usage.heapUsed - initial_usage.heapUsed;

	return diff;
};

Memory.prototype.getCurrentUsage = function () {
	return process.memoryUsage();
};

Memory.prototype.run = function (fn) {
	// Get the memory used after calling the function
	var current_usage = this.getCurrentUsage();
	fn();
	return this.getDiff(current_usage);
};

module.exports = Memory;