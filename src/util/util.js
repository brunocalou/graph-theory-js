var inherit = function(parent, child){
    var parent_copy = Object.create(parent.prototype);
    child.prototype = parent_copy; 
    child.prototype.constructor = child;
};

module.exports = {
	inherit: inherit
};