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
import ContainableSelectable from '../../../../views/behaviors/containers/containable-selectable.js';
import FilesPanelView from '../../../../views/apps/code-editor/sidebar/panels/files-panel-view.js';

export default SideBarView.extend(_.extend({}, ContainableSelectable, {

	//
	// attributes
	//

	panels: ['files'],

	//
	// attribute methods
	//

	enabled: function() {
		let isSignedIn = application.isSignedIn();

		return {
			'files': isSignedIn
		};
	},

	//
	// iterator
	//

	each: function(callback, filter, options) {
		if (this.hasChildView('files')) {
			this.getChildView('files').each(callback, filter, options);
		}
	},

	//
	// querying methods
	//

	hasSelectedItems: function() {
		if (this.hasChildView('files')) {
			return this.getChildView('files').hasSelected();
		}
	},

	//
	// panel rendering methods
	//
	
	showPanel: function(panel) {

		// show specified panel
		//
		switch (panel) {
			case 'files':
				this.showFilesPanel();
				break;
		}
	},

	showFilesPanel: function() {
		this.showChildView('files', new FilesPanelView({
			model: this.model,

			// options
			//
			view_kind: this.options.view_kind,

			// callbacks
			//
			onselect: this.options.onselect,
			ondeselect: this.options.ondeselect,
			onopen: this.options.onopen
		}));		
	}
}));