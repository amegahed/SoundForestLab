/******************************************************************************\
|                                                                              |
|                              index-panel-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing a type of sidebar panel.         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';
import SectionIndexView from '../../../../../views/apps/help-viewer/sidebar/indices/section-index-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'index panel',

	template: template(`
		<div class="header">
			<label id="table-of-contents"><i class="fa fa-sitemap"></i>Table of Contents</label>
		</div>
		
		<div class="items"></div>
	`),

	regions: {
		'items': {
			el: '.items',
			replaceElement: false
		}
	},

	events: {
		'click #table-of-contents': 'onClickTableOfContents'
	},

	//
	// getting methods
	//

	getItemViewByAttribute: function(key, value) {
		return this.getChildView('items').getItemViewByAttribute(key, value);
	},

	getSelected: function() {
		return this.getChildView('items').getSelected();
	},

	//
	// selecting methods
	//

	deselectAll: function() {
		return this.getChildView('items').deselectAll();
	},

	//
	// rendering methods
	//

	onRender: function() {

		// show child views
		//
		this.showContents();
	},

	showContents: function() {
		this.showChildView('items', new SectionIndexView({
			model: this.model,

			// capabilities
			//
			deselectable: false,
			editable: false,

			// callbacks
			//
			onselect: this.options.onselect
		}));
	},

	onClickTableOfContents: function() {

		// perform callback
		//
		if (this.options.onselect) {
			this.options.onselect();
		}
	}
});