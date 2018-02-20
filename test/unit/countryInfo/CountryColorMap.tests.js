import { CountryColorMap } from "../../../src/countryInfo/CountryColorMap";
import chai from "chai"

describe('Test CountryColorMap', function () {
    it('Should counts total of 228 countries', function () {
        let count = 0;
        for (let countryCode in CountryColorMap) {
            if (CountryColorMap.hasOwnProperty(countryCode)) {
                count++;
            }
        }
        let totalNumOfCountry = 226;
        chai.expect(count).to.equal(totalNumOfCountry);
    });
});