import { Utils } from '../../../src/utils/Utils';
import assert from 'assert';
import chai from "chai"

describe('Utils', function() {
    it('formatColor()', function() {
        assert.equal(0xffffff, Utils.formatColor('#ffffff'));
        assert.equal(0xffffff, Utils.formatColor(0xffffff));
    });
});

describe('Test constrain', function () {

	var min = 10;
	var max = 100;

	it('should return min for input < min', function () {
		chai.expect(Utils.constrain(9, min, max)).to.equal(min);
	});

	it('should return max for input > max', function () {
		chai.expect(Utils.constrain(101, min, max)).to.equal(max);
	});

	it('should return value for min < value < max', function () {
		chai.expect(Utils.constrain(11, min, max)).to.equal(11);
	});
  
});