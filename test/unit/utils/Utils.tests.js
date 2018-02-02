// import { Utils } from '../../../src/utils/Utils';
// import assert from 'assert';
// import chai from "chai"
//
// describe('Utils', function() {
//     it('formatColor()', function() {
//         assert.equal(0xffffff, Utils.formatColor('#ffffff'));
//         assert.equal(0xffffff, Utils.formatColor(0xffffff));
//     });
// });
//
// describe('Test CountryColorMap', function() {
//     it('Should', function() {
//         // let map = CountryColorMap;
//         // assert.equals(1, 1);
//     });
// });
//
// describe('Test Utils.wrap()', function() {
//     it('Should', function() {
//         Utils.wrap(1, 2, 3);
//     });
// });
//
// describe('Test Utils.constrain()', function () {
//
//     let min = 10;
//     let max = 100;
//
//     it('should return min for input < min', function () {
//         chai.expect(Utils.constrain(9, min, max)).to.equal(min);
//     });
//
//     it('should return max for input > max', function () {
//         chai.expect(Utils.constrain(101, min, max)).to.equal(max);
//     });
//
//     it('should return value for min < value < max', function () {
//         chai.expect(Utils.constrain(11, min, max)).to.equal(11);
//     });
//
// });
//
// describe('Test Utils.formatColor()', function() {
//     it('Should equal', function() {
//         assert.equal(0xffffff, Utils.formatColor('#ffffff'));
//         assert.equal(0xffffff, Utils.formatColor(0xffffff));
//     });
// });
//
// describe('Test Utils.transformBrightness()', function() {
//     it('Should', function() {
//         Utils.transformBrightness(1, 2, 3);
//     });
// });
//
// describe('Test Utils.transformCountryData()', function() {
//     it('Should', function() {
//         let countryData = {
//             name: '',
//             lat: 1,
//             lon: 1,
//             center: {},
//             colorCode: 100
//         };
//         // Utils.transformCountryData(countryData);
//     });
// });
//
// describe('Test Utils.flattenCountryData()', function() {
//     it('Should', function() {
//         let data = [
//             {e: "CN", i: "US", v: 1000},
//             {e: "CN", i: "RU", v: 3000000}
//         ];
//         Utils.flattenCountryData( data, 'v', 1000, 3000000 )
//     });
// });
//
// describe('Test Utils.getElementViewTop()', function() {
//     it('Should', function() {
//         let domElement = {
//             offsetTop: 100,
//             offsetParent: 10,
//             compatMode: 'BackCompat',
//             body: {
//                 scrollTop: 5
//             },
//             documentElement: {
//                 scrollTop: 5
//             }
//         };
//         // Utils.getElementViewTop(domElement);
//     });
// });
//
// describe('Test Utils.getElementViewLeft()', function() {
//     it('Should', function() {
//         let domElement = {
//             offsetTop: 100,
//             offsetParent: 10,
//             compatMode: 'BackCompat',
//             body: {
//                 scrollTop: 5
//             },
//             documentElement: {
//                 scrollTop: 5
//             }
//         };
//         // Utils.getElementViewLeft(domElement);
//     });
// });
