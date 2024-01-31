/******************************************************************************\
|                                                                              |
|                               menu-bar-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an app's menu bar.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import MenuBarView from '../../../../../views/apps/desktop/header-bar/menu-bar/menu-bar-view.js';
import FileMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/file-menu-view.js';
import EditMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/edit-menu-view.js';
import ViewMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/view-menu-view.js';
import ShareMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/share-menu-view.js';
import SearchMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/search-menu-view.js';
import HelpMenuView from '../../../../../views/apps/post-viewer/header-bar/menu-bar/menus/help-menu-view.js';

export default MenuBarView.extend({

	//
	// attributes
	//

	template: template(`
		<li class="file dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-file"></i><span class="dropdown-title">File</span></a>
			<div class="dropdown-menu"></div>
		</li>
		
		<li class="edit dropdown" style="display:none">
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-pencil-alt"></i><span class="dropdown-title">Edit</span></a>
			<div class="dropdown-menu"></div>
		</li>
		
		<li class="view dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-eye"></i><span class="dropdown-title">View</span></a>
			<div class="dropdown-menu"></div>
		</li>
		
		<li class="search dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-search"></i><span class="dropdown-title">Search</span></a>
			<div class="dropdown-menu"></div>
		</li>
		
		<li class="share dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-share"></i><span class="dropdown-title">Share</span></a>
			<div class="dropdown-menu"></div>
		</li>
		
		<li class="help dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-question-circle"></i><span class="dropdown-title">Help</span></a>
			<div class="dropdown-menu"></div>
		</li>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			options: this.options
		};
	},

	onRender: function() {

		// call superclass method
		//
		MenuBarView.prototype.onRender.call(this);

		// show dropdown menus
		//
		this.showChildView('file', new FileMenuView());
		this.showChildView('edit', new EditMenuView());
		this.showChildView('view', new ViewMenuView());
		this.showChildView('share', new ShareMenuView());
		this.showChildView('search', new SearchMenuView());
		this.showChildView('help', new HelpMenuView());

		// hide dropdowns
		//
		/*
		if (!this.app.topic.isOwnedBy(application.session.user)) {
			this.setDropdownHidden('edit');
		}
		if (this.app.topic.isRequired()) {
			this.setDropdownHidden('share');
		}
		*/

		this.setDropdownHidden('search');

		// listen to model for changes
		//
		this.listenTo(this.parent.unsubscribed, 'add, remove', this.onChange);
	}
});