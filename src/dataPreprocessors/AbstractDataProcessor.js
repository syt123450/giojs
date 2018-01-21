/**
 * @author mokuteno / https://github.com/manymeeting
 */

AbstractDataProcessor = function() {
    this.successor = null;
};

AbstractDataProcessor.prototype.setSuccessor = function(dp) {
    this.successor = dp;
}
AbstractDataProcessor.prototype.process = function(data) {
}

export { AbstractDataProcessor }