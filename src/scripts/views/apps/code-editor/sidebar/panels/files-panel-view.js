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

import File from '../../../../../models/files/file.js';
import UserPreferences from '../../../../../models/preferences/user-preferences.js';
import Items from '../../../../../collections/files/items.js';
import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';
import EditableFilesView from '../../../../../views/apps/file-browser/mainbar/files/editable-files-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'files panel',

	template: template(`
		<div class="header">
			<label><i class="fa fa-file"></i>Files</label>
		
			<div class="buttons">
				<button type="button" class="new-file success btn btn-sm" data-toggle="tooltip" title="New File">
					<i class="fa fa-plus"></i>
				</button>
			</div>
		</div>
		
		<div class="items"></div>
	`),

	regions: {
		'items': '.items'
	},	

	events: {
		'click .new-file': 'onClickNewFile'
	},

	//
	// iterator
	//

	each: function(callback, filter, options) {
		if (this.hasChildView('items')) {
			this.getChildView('items').each(callback, filter, options);
		}
	},

	//
	// querying methods
	//

	hasSelected: function() {
		if (this.hasChildView('items')) {
			return this.getChildView('items').hasSelected();
		}
	},

	//
	// getting methods
	//

	getSelected: function() {
		return this.getChildView('items').getSelected();
	},

	getSelectedModels: function() {
		return this.getChildView('items').getSelectedModels();
	},
	
	//
	// setting methods
	//

	setDirectory: function(directory) {

		// set to directory or home directory
		//
		this.model = directory || application.getDirectory();

		// update
		//
		this.onRender();
	},

	setSelected: function(model, options) {
		this.getChildView('items').setSelectedModels([model], options);

		// scroll into view
		//
		this.scrollTo(this.getSelected()[0]);
	},

	//
	// loading methods
	//

	loadFiles: function(done) {

		// load directory
		//
		this.request = this.model.load({

			// callbacks
			//
			success: () => {

				// perform callback
				//
				if (this.options.onload) {
					this.options.onload(this.model);
				}

				if (done) {
					done(this.model);
				}
			},

			error: () => {

				// reset home directory path
				//
				this.model.set({
					path: ''
				});
			}
		});
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		SideBarPanelView.prototype.onRender.call(this);

		// update panel contents
		//
		if (!this.model.loaded && application.session.user && !this.request) {
			this.update();
		} else {
			this.showFiles();

			// perform callback
			//
			if (this.options.onload) {
				this.options.onload(this.model);
			}		
		}
	},

	showFiles: function() {
		this.showChildView('items', new EditableFilesView({
			model: this.model,
			collection: this.model.contents,

			// options
			//
			preferences: UserPreferences.create('file_browser', {
				view_kind: this.options.view_kind,
				show_file_extensions: true
			}),
			selected: new Items([this.model]),
			empty: "No files.",

			// capabilities
			//
			selectable: true,
			editable: true,
			draggable: true,
			droppable: true,

			// callbacks
			//
			onselect: this.options.onselect,
			ondeselect: this.options.ondeselect,
			onopen: this.options.onopen
		}));
	},

	update: function() {
		this.request = this.loadFiles(() => {
			this.showFiles();
		});
	},

	//
	// mouse event handling methods
	//

	onClickNewFile: function() {
		this.app.newFile();
	},

	//
	// file event handling methods
	//

	onOpen: function(item) {

		// open item using app
		//
		if (item.model instanceof File) {
			this.app.openItem(item.model);

		// open folder
		//
		} else {
			this.app.pushDirectory(item.model);
		}
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {

		// abort request
		//
		if (this.request && this.request.state() == 'pending') {
			this.request.abort();
		}
	}
});