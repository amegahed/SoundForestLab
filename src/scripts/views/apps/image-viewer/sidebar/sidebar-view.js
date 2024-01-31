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

import SideBarView from '../../../../views/apps/common/sidebar/sidebar-view.js';
import ImagesPanelView from '../../../../views/apps/image-viewer/sidebar/panels/images-panel-view.js';

export default SideBarView.extend({

	//
	// attributes
	//

	panels: ['images'],

	//
	// querying methods
	//

	hasSelected: function() {
		if (this.hasChildView('images')) {
			return this.getChildView('images').hasSelected();
		}
	},

	//
	// getting methods
	//

	getSelected: function() {
		return this.getChildView('images').getSelected();
	},

	getSelectedModels: function() {
		return this.getChildView('images').getSelectedModels();
	},
	
	//
	// setting methods
	//

	setModel: function(model) {

		// update attributes
		//
		this.model = model;

		// update panels
		//
		if (this.hasChildView('image_info')) {
			this.showImageInfo();
		}
	},

	setSelected: function(model, options) {
		this.getChildView('images').setSelectedModel(model, options);

		// scroll into view
		//
		this.scrollToView(this.getSelected()[0]);
	},

	//
	// panel rendering methods
	//

	showPanel: function(panel) {

		// show specified panel
		//
		switch (panel) {
			case 'images':
				this.showImagesPanel();
				break;
		}
	},

	showImagesPanel: function() {
		this.showChildView('images', new ImagesPanelView({
			model: this.model,
			collection: this.collection,

			// options
			//
			view_kind: this.options.view_kind,
			tile_size: this.options.tile_size
		}));		
	},

	//
	// event handling methods
	//

	onChange: function() {
		this.showImagesPanel();
	}
});