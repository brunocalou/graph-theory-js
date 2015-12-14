var
	chalk = require('chalk'),
	MemorySize = Object.freeze({
		BYTE: 1,
		KB: 1024,
		MB: 1024 * 1024
	});

var inherit = function (parent, child) {
    var parent_copy = Object.create(parent.prototype);
    child.prototype = parent_copy;
    child.prototype.constructor = child;
};

var printObject = function (object) {
	for (var property in object) {
		if (object.hasOwnProperty(property)) {
			console.log(property + ':' + object[property]);
		}
	}
}

var printMemory = function (memory_usage, size, color) {
	if (!memory_usage) memory_usage = process.memoryUsage();
	if (!size) size = MemorySize.KB;
	if (!color) color = 'yellow';

	var size_name = "Bytes";
	if (size === MemorySize.KB) {
		size_name = "KB";
	} else if (size === MemorySize.MB) {
		size_name = "MB";
	}

	console.log('');
	console.log(' ' + chalk[color]("RSS" + ' : ') + memory_usage.rss / size + ' ' + size_name);
	console.log(' ' + chalk[color]("Total Heap" + ' : ') + memory_usage.heapTotal / size + ' ' + size_name);
	console.log(' ' + chalk[color]("Used Heap" + ' : ') + memory_usage.heapUsed / size + ' ' + size_name);
	console.log('');
}

module.exports = {
	inherit: inherit,
	printObject: printObject,
	printMemory: printMemory,
	MemorySize: MemorySize
};