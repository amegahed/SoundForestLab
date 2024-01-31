/******************************************************************************\
|                                                                              |
|                             app-menu-bar-view.js                             |
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

import MenuBarView from '../../../../../views/apps/common/header-bar/menu-bar/menu-bar-view.js';

export default MenuBarView.extend({

	//
	// getting methods
	//

	getMenus: function() {
		let menus = [];
		let keys = Object.keys(this.regions);
		for (let i = 0; i < keys.length; i++) {
			menus.push(this.getChildView(keys[i]));
		}
		return menus;
	},

	//
	// rendering methods
	//

	onRender: function() {
		let isSignedIn = application.isSignedIn();

		// call superclass method
		//
		MenuBarView.prototype.onRender.call(this);

		// hide dropdown menus
		//
		if (!isSignedIn) {
			this.$el.find('.share.dropdown').addClass('disabled');
		}
	},

	//
	// event handling methods
	//

	onLoad: function() {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onLoad) {
				menu.onLoad();
			}
		}
	},

	onChange: function() {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onChange) {
				menu.onChange();
			}
		}
	},

	onChangeTab: function() {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onChangeTab) {
				menu.onChangeTab();
			}
		}
	},

	onSave: function() {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onSave) {
				menu.onSave();
			}
		}
	},

	//
	// selection event handling methods
	//

	onSelect: function(view) {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onSelect) {
				menu.onSelect(view);
			}
		}
	},

	onDeselect: function() {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onDeselect) {
				menu.onDeselect();
			}
		}
	},

	onChangeSelection: function() {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onChangeSelection) {
				menu.onChangeSelection();
			}
		}
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		let menus = this.getMenus();
		for (let i = 0; i < menus.length; i++) {
			let menu = menus[i];
			if (menu && menu.onKeyDown) {
				menu.onKeyDown(event);
			}
		}
	}
});