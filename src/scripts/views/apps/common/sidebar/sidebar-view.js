/******************************************************************************\
|                                                                              |
|                               sidebar-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an app's sidebar.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import PanelsView from '../../../../views/layout/panels-view.js';
import Scrollable from '../../../../views/behaviors/layout/scrollable.js';

export default PanelsView.extend(_.extend({}, Scrollable, {

	//
	// querying methods
	//

	isPanelVisible: function(name) {
		if (this.hasChildView(name)) {
			return this.getChildView(name).isVisible();
		} else {
			return this.options.panels && this.options.panels.includes(name);
		}
	},

	//
	// getting methods
	//

	getPanelsVisible: function() {
		return this.options.panels;
	},

	//
	// setting methods
	//

	setPanelVisibility: function(name, value) {
		if (value) {

			// show panel
			//
			if (this.hasChildView(name)) {
				this.getChildView(name).show();
			} else {
				this.showPanel(name);
			}
		} else if (this.hasChildView(name)) {

			// hide panel
			//
			this.getChildView(name).hide();
		}
	},

	setPanelsVisible: function(names) {
		let keys = Object.keys(this.regions);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			this.setPanelVisibility(key, names.includes(key));
		}
	},

	//
	// setting methods
	//

	setViewKind: function(viewKind) {
		this.options.view_kind = viewKind;

		// set option on all panels except info or files
		//
		for (let i = 0; i < this.panels.length; i++) {
			let panel = this.panels[i];

			if (panel == 'info' || panel == 'files') {
				if (this.options.info_kind != 'auto') {
					continue;
				}
			}

			let childView = this.getChildView(panel);
			if (childView && childView.setViewKind) {
				childView.setViewKind(viewKind);
			}
		}

		this.app.preferences.set('sidebar_view_kind', viewKind);
	},

	setTileSize: function(tileSize) {
		this.options.tile_size = tileSize;

		// set option on all panels
		//
		for (let i = 0; i < this.panels.length; i++) {
			let panel = this.panels[i];
			let childView = this.getChildView(panel);
			if (childView && childView.setTileSize) {
				childView.setTileSize(tileSize);
			}
		}

		this.app.preferences.set('sidebar_tile_size', tileSize);
	},

	//
	// rendering methods
	//

	showPanels: function(panels) {
		let regions = panels || Object.keys(this.regions);
		let enabled = _.result(this, 'enabled');
		for (let i = 0; i < regions.length; i++) {
			let region = regions[i];
			if (this.isPanelVisible(region) && (enabled? enabled[region] : true)) {
				this.showPanel(region);
			}
		}
	},

	scrollToView: function(view) {
		if (view) {
			this.scrollElementToElement(this.$el.closest('.sidebar')[0], view.el, {
				margin: 10
			});
		}
	}
}));