/******************************************************************************\
|                                                                              |
|                                query-string.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file contains some javascript utilities that are used to         |
|        deal with the browser address bar.                                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import AddressBar from '../../utilities/web/address-bar.js';
import Url from '../../utilities/web/url.js';

export default {

	//
	// querying methods
	//

	exists: function() {
		return AddressBar.get('location').contains('?');
	},

	hasParam: function(name, options) {
		return (this.getParam(name, options) != undefined);
	},

	//
	// getting methods
	//

	get: function() {
		let location = AddressBar.get('location');

		// get location after question mark symbol
		//
		if (location.contains('?')) {
			let terms = location.split('?');
			return terms[terms.length - 1];
		}
	},

	getParam: function(name, options) {
		let queryString;

		// get query string
		//
		if (options && options.queryString) {
			queryString = options.queryString;
		} else {
			queryString = this.get();
		}

		if (!queryString) {
			return undefined;
		}
		
		// split query string into key value pairs
		//
		let terms = queryString.split('&');
		for (let i = 0; i < terms.length; i++) {
			let term = terms[i];

			// split key value pair by first equal sign
			//
			let equalSign = term.indexOf('=');
			let key = term.substr(0, equalSign);
			let value = term.substr(equalSign + 1, term.length);

			// check if key matches name
			//
			if (key == name) {
				return value;
			}
		}
		
		return undefined;
	},

	getParams: function(name, options) {
		let queryString;
		let params = [];

		// get query string
		//
		if (options && options.queryString) {
			queryString = options.queryString;
		} else {
			queryString = this.get();
		}

		if (!queryString) {
			return undefined;
		}
		
		// split query string into key value pairs
		//
		let terms = queryString.split('&');
		for (let i = 0; i < terms.length; i++) {
			let term = terms[i];

			// split key value pair by first equal sign
			//
			let equalSign = term.indexOf('=');
			let key = term.substr(0, equalSign);
			let value = term.substr(equalSign + 1, term.length);

			// check if key matches name
			//
			if (key == name) {
				params.push(value);
			}
		} 
		
		return params;
	},

	//
	// setting methods
	//

	set: function(queryString, options) {
		if (queryString) {
			AddressBar.set(AddressBar.get('base') + "?" + queryString, options);
		} else {
			AddressBar.set(AddressBar.get('base'), options);
		}
	},

	clear: function(options) {
		AddressBar.set(AddressBar.get('location').split('?')[0], options);
	},

	//
	// adding methods
	//

	concat: function(queryString, newString) {
		if (queryString && queryString != '' && newString && (newString != undefined)) {
			return queryString + '&' + newString;
		} else if (queryString && queryString != '') {
			return queryString;
		} else {
			return newString;
		}
	},

	add: function(queryString, params) {
		for (let key in params) {
			let value = params[key];
			if (value) {
				queryString = this.concat(queryString, key + '=' + value.toString());
			}				
		}
		return queryString;
	},

	//
	// converting methods
	//

	encode: function(data) {
		let queryString = '';
		for (let key in data) {
			let value = data[key];
			if (value) {
				if (typeof value != 'string') {
					value = value.toString();
				}
				queryString = this.concat(queryString, key + '=' + Url.encode(value));
			}
		}
		return queryString;
	},

	decode: function(queryString) {
		let data = {};
		if (queryString) {
			let terms = queryString.split('&');
			for (let i = 0; i < terms.length; i++) {
				let term = terms[i];

				// split key value pair by first equal sign
				//
				let equalSign = term.indexOf('=');
				let key = term.substr(0, equalSign);
				let value = term.substr(equalSign + 1, term.length);

				// check for array values
				//
				if (key.endsWith('[]')) {

					// add item to array
					//
					let array = key.substring(0, key.length - 2);
					if (data[array]) {
						data[array].push(value);
					} else {
						data[array] = [value];
					}
				} else {
					if (value == "true") {
						value = true;
					} else if (value == "false") {
						value = false;
					}
					data[key] = value;
				}
			}
		}
		return data;
	}
};