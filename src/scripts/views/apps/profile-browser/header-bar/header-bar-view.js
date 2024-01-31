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

import HeaderBarView from '../../../../views/apps/common/header-bar/header-bar-view.js';
import NavBarView from '../../../../views/apps/profile-browser/header-bar/nav-bar/nav-bar-view.js';
import SearchBarView from '../../../../views/apps/profile-browser/header-bar/search-bar/search-bar-view.js';
import MenuBarView from '../../../../views/apps/profile-browser/header-bar/menu-bar/menu-bar-view.js';

export default HeaderBarView.extend({

	//
	// attributes
	//

	toolbars: ['nav', 'search', 'menu'],

	//
	// rendering methods
	//

	showToolbar: function(kind) {
		switch (kind) {
			case 'nav':
				this.showNavBar();
				break;
			case 'search':
				this.showSearchBar();
				break;
			case 'menu':
				this.showMenuBar();
				break;
		}
	},

	showNavBar: function() {
		this.showChildView('nav', new NavBarView());	
	},

	showSearchBar: function() {
		this.showChildView('search', new SearchBarView({
			search: this.parent.options.search,

			// callbacks
			//
			onsearch: (search) => this.parent.searchFor(search)
		}));
	},

	showMenuBar: function() {
		this.showChildView('menu', new MenuBarView());
	},
});