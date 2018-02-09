
import { Utils } from '../../../src/utils/Utils';
import chai from "chai"

describe('Test Utils.wrap()', function() {
	it('Should return 2 for Util.wrap(1, 2, 5)', function () {
        let value = 1;
        let min = 2;
        let rangeSize = 5;
        let expectedValue = 1;
        chai.expect(Utils.wrap(value, min, rangeSize)).to.equal(expectedValue);
    });
});

describe('Test Utils.constrain()', function() {

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

describe('Test Utils.formatColor()', function() {
    it('Should return 0xffffff for input #ffffff (String)', function() {
    	let expectedValue = 0xffffff;
        chai.expect( Utils.formatColor('#ffffff')).to.equal(expectedValue);
    });
    
    it('Should return 0xffffff for input ffffff (String)', function() {
        let expectedValue = null;
        chai.expect( Utils.formatColor('ffffff')).to.equal(expectedValue);
    });
    
    it('Should return 0xffffff for input 0xffffff (Number)', function() {
        let expectedValue = 0xffffff;
        chai.expect( Utils.formatColor(0xffffff)).to.equal(expectedValue);
    });
    
    it('Should return null for input -1 (Number)', function() {
        let expectedValue = null;
        chai.expect( Utils.formatColor(-1)).to.equal(expectedValue);
    });
});

describe('Test Utils.transformBrightness()', function() {
	let min = 0;
	let max = 255;
	it('Should return max for brightness > 1', function () {
		let brightness = 256;
		let expectedValue = 255;
		chai.expect(Utils.transformBrightness(brightness, min, max)).to.equal(expectedValue);
    });
    
    it('Should return min for brightness < 0', function () {
        let brightness = -1;
        let expectedValue = 0;
        chai.expect(Utils.transformBrightness(brightness, min, max)).to.equal(expectedValue);
    });
    
    it('Should return a number between (min, max)', function () {
        let brightness = 0.5;
        let expectedValue = 127;
        chai.expect(Utils.transformBrightness(brightness, min, max)).to.equal(expectedValue);
    });
    
});

describe('Test Utils.transformCountryData()', function() {
	it('Should return an object that is deep-equal to the original object', function() {
        let countryData = {
            name: 'Peru',
	        ISOCode: 'PE',
            lat: -10,
            lon: -76,
	        center: {
            	clone: function clone() {
            		return clone;
	            }
	        },
            colorCode: 1
        };
		let transformedCountryData = Utils.transformCountryData(countryData);
		chai.expect(transformedCountryData.name).to.equal(countryData.name);
        chai.expect(transformedCountryData.lat).to.equal(countryData.lat);
        chai.expect(transformedCountryData.lon).to.equal(countryData.lon);
        chai.expect(transformedCountryData.ISOCode).to.equal(countryData.ISOCode);
	});
});

describe('Test Utils.flattenCountryData()', function() {
    it('Should return directly when data is []', function() {
        let originalData = [];
        let key = 'v';
        let min = 100;
        let max = 200;
        
        Utils.flattenCountryData(originalData, key, min, max);
        
        let expectedValue = [];
        chai.expect(originalData).to.deep.equal(expectedValue);
    });
    
	it('Should return flattened data', function() {
		let originalData = [
            {
				"e": "CN",
				"i": "US",
	            "v": 30000
			},
            {
                "e": "RU",
                "i": "US",
                "v": 20000
            },
            {
                "e": "CN",
                "i": "RU",
                "v": 10000
			}
		];

		let key = 'v';
		let min = 100;
		let max = 300;

		Utils.flattenCountryData(originalData, key, min, max);
		
        let expectedValue = [
            {
                "e": "CN",
                "i": "US",
                "v": 300
            },
            {
                "e": "RU",
                "i": "US",
                "v": 200
            },
            {
                "e": "CN",
                "i": "RU",
                "v": 100
            }
        ];
        
        chai.expect(originalData).to.deep.equal(expectedValue);
	});
});

describe('Test Utils.getElementViewTop()', function() {
	it('Should pass', function() {
        global.document = {
            compatMode: 'BackCompat',
            body: {
                scrollTop: 10
            },
            documentElement: {
                scrollTop: 20
            }
        };

		let element = {
            offsetTop: 10,
            offsetParent: {
            	offsetTop: 10,
	            offsetParent: null
            },
		};

		Utils.getElementViewTop(element);
	});

    it('Should pass', function() {
        global.document = {
            compatMode: '',
            body: {
                scrollTop: 10
            },
            documentElement: {
                scrollTop: 20
            }
        };

        let element = {
            offsetTop: 10,
            offsetParent: {
                offsetTop: 10,
                offsetParent: null
            },
        };

        Utils.getElementViewTop(element);
    });
});

describe('Test Utils.getElementViewLeft()', function() {
    it('Should pass', function() {
        global.document = {
            compatMode: 'BackCompat',
            body: {
                scrollLeft: 10
            },
            documentElement: {
                scrollLeft: 20
            }
        };
        
        let element = {
            offsetLeft: 10,
            offsetParent: {
                offsetLeft: 10,
                offsetParent: null
            },
        };
        
        Utils.getElementViewLeft(element);
    });
    
    it('Should pass', function() {
        global.document = {
            compatMode: '',
            body: {
                scrollLeft: 10
            },
            documentElement: {
                scrollLeft: 20
            }
        };
        
        let element = {
            offsetLeft: 10,
            offsetParent: {
                offsetLeft: 10,
                offsetParent: null
            },
        };
        
        Utils.getElementViewLeft(element);
    });
});
