/******************************************************************************\
|                                                                              |
|                              header-bar-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used to display an app's header bar.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ToolbarContainerView from '../../../../views/apps/common/toolbars/toolbar-container-view.js';

export default ToolbarContainerView.extend({

	//
	// attributes
	//

	className: 'header-bar',
	toolbars: ['menu'],
	mandatory_toolbars: ['menu', 'status', 'search'],

	//
	// constructor
	//

	constructor: function() {

		// add status bar to header bar
		//
		if (this.toolbars) {
			if (this.toolbars.includes('search')) {

				// check if search bar is last item
				//
				if (this.toolbars.indexOf('search') == this.toolbars.length - 1) {

					// add status bar as next to last bar
					//
					this.toolbars.pop();
					this.toolbars.push('status');
					this.toolbars.push('search');
				} else {

					// add status bar as last bar
					//
					this.toolbars.push('status');
				}
			} else {

				// add status bar as last bar
				//
				this.toolbars.push('status');
			}
		}

		// call superclass constructor
		//
		ToolbarContainerView.apply(this, arguments);
	},

	//
	// querying methods
	//

	isOptionalToolbarKind: function(toolbar) {
		return !this.mandatory_toolbars.includes(toolbar);
	},

	//
	// setting methods
	//

	setToolbarVisible: function(kind, value) {
		if (value) {
			if (this.hasChildView(kind)) {
				this.setToolbarRegionVisible(kind, true);
			} else {
				this.showToolbar(kind);
			}
		} else if (this.hasChildView(kind)) {
			this.setToolbarRegionVisible(kind, false);
		}
	},

	setToolbarRegionVisible: function(kind, visible) {
		if (visible) {
			this.getRegion(kind).$el.removeClass('hidden');
		} else {
			this.getRegion(kind).$el.addClass('hidden');
		}
	},

	setToolbarsVisible: function(visible) {
		if (Array.isArray(visible)) {
			for (let i = 0; i < this.toolbars.length; i++) {
				let toolbar = this.toolbars[i];

				// set visibility of optional toolbars
				//
				if (this.isOptionalToolbarKind(toolbar)) {
					let isVisible = visible.includes(toolbar);
					this.setToolbarVisible(toolbar, isVisible);
				}
			}
		} else {
			this.setAllToolbarsVisible(visible);
		}
	},

	setAllToolbarsVisible: function(isVisible) {
		for (let i = 0; i < this.toolbars.length; i++) {
			let toolbar = this.toolbars[i];

			// set visibility of optional toolbars
			//
			if (this.isOptionalToolbarKind(toolbar)) {
				this.setToolbarVisible(toolbar, isVisible);
			}
		}
	},

	setToolbarVisibility: function(visibility) {
		let keys = Object.keys(visibility);
		for (let i = 0; i < keys.length; i++) {
			let toolbar = keys[i];

			// set visibility of optional toolbars
			//
			if (this.isOptionalToolbarKind(toolbar)) {
				let isVisible = visibility[toolbar];
				this.setToolbarVisible(toolbar, isVisible);
			}
		}
	},

	//
	// toolar enabling methods
	//

	setToolbarEnabled: function(kind, value) {
		this.getChildView(kind).setEnabled(value);
	},

	setToolbarsEnabled: function(enabled) {
		if (enabled && enabled.length > 0) {
			for (let i = 0; i < this.toolbars.length; i++) {
				let toolbar = this.toolbars[i];

				// set visibility of optional toolbars
				//
				if (this.isOptionalToolbarKind(toolbar)) {
					let isEnabled = enabled.includes(toolbar);
					this.setToolbarEnabled(toolbar, isEnabled);
				}
			}
		} else {
			this.setAllToolbarsEnabled(enabled);
		}
	},

	setAllToolbarsEnabled: function(isEnabled) {
		for (let i = 0; i < this.toolbars.length; i++) {
			let toolbar = this.toolbars[i];

			// set visibility of optional toolbars
			//
			if (this.isOptionalToolbarKind(toolbar)) {
				this.setToolbarEnabled(toolbar, isEnabled);
			}
		}
	},

	setToolbarEnabling: function(enabling) {
		let keys = Object.keys(enabling);
		for (let i = 0; i < keys.length; i++) {
			let toolbar = keys[i];

			// set visibility of optional toolbars
			//
			if (this.isOptionalToolbarKind(toolbar)) {
				let isEnabled = enabling[toolbar];
				this.setToolbarEnabled(toolbar, isEnabled);
			}
		}
	},

	//
	// search methods
	//

	clearSearchBar: function() {

		// remove current search
		//
		this.getRegion('search').empty();

		// set menu
		//
		this.getChildView('menu search').setSearchKind(null);

		// clear app's search
		//
		if (this.parent.clearSearch) {
			this.parent.clearSearch();
		}

		// update content region
		//
		this.parent.onResize();
	},

	showSearch: function(search) {
		let kind = search? Object.keys(search)[0] : '';
		let value = search? search[kind] : '';

		// set search bar
		//
		if (kind) {
			this.showSearchBar(kind, value);

			// set menu
			//
			this.getChildView('menu search').setSearchKind(kind);
		} else {
			this.clearSearchBar();
		}
	},

	//
	// rendering methods
	//

	onRender: function() {
		this.app = this.getParentView('app');

		// show child views
		//
		this.showToolbars();

		// disable toolbars
		//
		if (this.enabled) {
			this.setToolbarEnabling(_.result(this, 'enabled'));
		}

		// set initial toolbar visibility
		//
		if (this.app.preferences.has('toolbars')) {
			this.setToolbarsVisible(this.app.preferences.get('toolbars'));
		}
	},

	regions: function() {
		let regions = {};
		for (let i = 0; i < this.toolbars.length; i++) {
			let toolbar = this.toolbars[i];
			regions[toolbar] = {
				el: '.' + toolbar.replace(/_/g, '-') + '-bar',
				replaceElement: false
			};
		}
		return regions;
	},

	showToolbars: function() {
		let regionNames = Object.keys(this.regions);
		let toolbars = this.app.preferences.get('toolbars');

		for (let i = 0; i < regionNames.length; i++) {
			let kind = regionNames[i]
			this.showToolbar(kind);

			// set toolbar visibility
			//
			if (this.isOptionalToolbarKind(kind)) {
				if (typeof toolbars == 'boolean') {
					this.setToolbarVisible(kind, toolbars);
				} else if (toolbars && toolbars.length > 0) {
					this.setToolbarVisible(kind, toolbars && toolbars.includes(kind));
				}
			}
		}
	}
});