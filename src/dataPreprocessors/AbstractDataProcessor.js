/**
 * @author mokuteno / https://github.com/manymeeting
 */

function AbstractDataProcessor () {

	this.successor = null;

}

AbstractDataProcessor.prototype.setSuccessor = function ( dp ) {

	this.successor = dp;

};

AbstractDataProcessor.prototype.process = function ( controller ) {

	if ( this.isMatched( controller ) ) {

		this.processDetail( controller );

	}

	if ( this.successor !== null ) {

		this.successor.process( controller );

	}

};

AbstractDataProcessor.prototype.processDetail = function ( controller ) {
};

AbstractDataProcessor.prototype.isMatched = function ( controller ) {

	return true;

};

export { AbstractDataProcessor }