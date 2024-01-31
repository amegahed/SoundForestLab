/******************************************************************************\
|                                                                              |
|                                search-bar-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for searching files.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SearchBarView from '../../../../../views/apps/common/header-bar/search-bar/search-bar-view.js';

export default SearchBarView.extend({

	//
	// file attribute searching methods
	//

	showSearchByCoords: function() {
		import(
			'../../../../../views/apps/map-viewer/header-bar/search-bar/searches/search-by-coords-view.js'
		).then((SearchByCoordsView) => {

			// show search
			//
			this.showChildView('searches', new SearchByCoordsView.default({
				value: this.options.value
			}));

			// perform callback
			//
			if (this.options.onshow) {
				this.options.onshow();
			}
		});
	},

	showSearchByAddress: function() {
		import(
			'../../../../../views/apps/map-viewer/header-bar/search-bar/searches/search-by-address-view.js'
		).then((SearchByAddressView) => {

			// show search
			//
			this.showChildView('searches', new SearchByAddressView.default({
				value: this.options.value
			}));

			// perform callback
			//
			if (this.options.onshow) {
				this.options.onshow();
			}
		});
	},

	showSearchByName: function() {
		import(
			'../../../../../views/apps/common/header-bar/search-bar/searches/search-by-name-view.js'
		).then((SearchByNameView) => {

			// show search
			//
			this.showChildView('searches', new SearchByNameView.default({
				value: this.options.value
			}));

			// perform callback
			//
			if (this.options.onshow) {
				this.options.onshow();
			}
		});
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		SearchBarView.prototype.onRender.call(this);

		// set search kind
		//
		switch (this.options.kind) {
			
			case 'coords':
				this.showSearchByCoords();
				break;
			case 'address':
				this.showSearchByAddress();
				break;
			case 'name':
				this.showSearchByName();
				break;
				
			default:
				this.clear();
				break;
		}
	}
});