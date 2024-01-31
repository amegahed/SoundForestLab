/******************************************************************************\
|                                                                              |
|                              files-panel-view.js                             |
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

import UserPreferences from '../../../../../models/preferences/user-preferences.js';
import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';
import EditableFilesView from '../../../../../views/apps/file-browser/mainbar/files/editable-files-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'files panel',

	template: template(`
		<div class="header">
			<label><i class="fa fa-folder"></i>Files</label>
		</div>
		
		<div class="items"></div>
	`),

	regions: {
		'items': {
			el: '.items',
			replaceElement: true
		}
	},

	//
	// selecting methods
	//

	selectItem: function(item) {
		this.getChildView('items').getChildView('items').selectItem(item);
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		SideBarPanelView.prototype.onRender.call(this);

		// show child views
		//
		this.showItems();

		// set initial status
		//
		this.update();
	},

	update: function() {

		// show current location
		//
		this.selectItem(this.app.model);
	},

	showItems: function() {
		let app = this.getParentView('app');
		let directory = application.getDirectory();

		// create tree view
		//
		this.showChildView('items', new EditableFilesView({
			model: directory,
			collection: directory.contents,

			// options
			//
			preferences: UserPreferences.create('file_browser', {
				view_kind: 'trees'
			}),
			filter: (view) => {
				return !view.isHidden();
			},
			selected: this.model,

			// capabilities
			//
			selectable: true,
			editable: false,
			draggable: false,
			droppable: true,

			// callbacks
			//
			onopen: (item) => {
				app.openItem(item.model, {

					// callbacks
					//
					success: () => {
						this.onOpen(item);
					}
				});
			}
		}));
	},

	//
	// event handling methods
	//

	onOpen: function(item) {

		// perform callback
		//
		if (this.options.onopen) {
			this.options.onopen(item);
		}
	}
});