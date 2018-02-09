import { StyleFactory } from '../../../src/style/StyleFactory';
import chai from "chai"

describe('Test StyleFactory', function () {
    it('Should pass', function () {
        StyleFactory.register('myStyle', 123);
        StyleFactory.getStyle('myStyle');
    });
});