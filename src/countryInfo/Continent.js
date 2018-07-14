
var Continent = (function() {

	var continentList = {
		"names": ["OCEANIA", "NORTH AMERICA", "SOUTH AMERICA", "AFRICA", "EUROPE", "ASIA"],
		"OCEANIA": {
			"countries": ["AU", "CK", "FJ", "GU", "NZ", "PG"],
			"lat": -27,
			"lon": 133
		},
		"NORTH AMERICA": {
			"countries": ["BM", "BS", "CA", "CR", "CU", "GD", "GT", "HN", "HT", "JM", "MX", "NI", "PA", "US", "VE"],
			"lat": 39.5,
			"lon": -95
		},
		"SOUTH AMERICA": {
			"countries": ["AR", "BO", "BR", "CL", "CO", "EC", "GY", "PE", "PY", "UY"],
			"lat": -21,
			"lon": -58.5
		},
		"AFRICA": {
			"countries": ["AO", "BI", "BJ", "BW", "CF", "CG", "CM", "CV", "DZ", "EG", "ET", "GA", "GH", "GM", "GN", "GQ", "KE", "LY", "MA", "MG", "ML", "MR", "MU", "MZ", "NA", "NE", "NG", "RW", "SD", "SN", "SO", "TZ", "UG", "ZA", "ZM", "ZW", "TN"],
			"lat": 1,
			"lon": 17
		},
		"EUROPE": {
			"countries": ["AT", "BE", "BG", "CH", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "RU", "SE", "SK", "SM", "UA", "VA"],
			"lat": 53.5,
			"lon": 28
		},
		"ASIA": {
			"countries": ["AE", "AF", "AL", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "ID", "IL", "IN", "IQ", "JO", "JP", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LU", "MN", "MV", "MY", "NP", "OM", "PH", "PK", "QA", "SA", "SG", "SY", "TH", "TJ", "TM", "UZ", "VN", "YE"],
			"lat": 35,
			"lon": 108.5
		}
	};

	function createContinentCenter () {

		var rad = 100;

		for ( var i = 0; i < continentList.names.length; i++ ) {

			var continentName = continentList.names[i];
			var continentInfo = continentList[continentName];

			var lon = continentInfo.lon - 90;
			var lat = continentInfo.lat;

			var phi = Math.PI / 2 - lat * Math.PI / 180 - Math.PI * 0.01;
			var theta = 2 * Math.PI - lon * Math.PI / 180 + Math.PI * 0.06;

			var center = new THREE.Vector3();
			center.x = Math.sin( phi ) * Math.cos( theta ) * rad;
			center.y = Math.cos( phi ) * rad;
			center.z = Math.sin( phi ) * Math.sin( theta ) * rad;

			continentInfo.center = center;

		}

	}

	createContinentCenter();

	return continentList;

}());

export { Continent }