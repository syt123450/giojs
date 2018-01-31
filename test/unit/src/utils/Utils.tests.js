import { Utils } from '../../../../src/utils/Utils';
import assert from 'assert';

describe('Utils', function() {
    it('formatColor()', function() {
        assert.equal(0xffffff, Utils.formatColor('#ffffff'));
        assert.equal(0xffffff, Utils.formatColor(0xffffff));
    });
});