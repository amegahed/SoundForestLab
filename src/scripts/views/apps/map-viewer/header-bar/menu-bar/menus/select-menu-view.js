/******************************************************************************\
|                                                                              |
|                              select-menu-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying select dropdown menus.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SelectMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/select-menu-view.js';

export default SelectMenuView.extend({

	//
	// attributes
	//

	template: template(`
		<li role="presentation">
			<a class="select-all"><i class="fa fa-asterisk"></i>All<span class="command shortcut">A</span></a>
		</li>
		
		<li role="presentation">
			<a class="select-none"><i class="fa fa-minus"></i>None<span class="shift command shortcut">A</span></a>
		</li>
		
		<li role="presentation">
			<a class="select-invert"><i class="fa fa-random"></i>Invert<span class="shift command shortcut">I</span></a>
		</li>

		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="select-multiple"><i class="fa fa-check"></i><i class="fa fa-ellipsis-h"></i>Multiple<span class="shift command shortcut">M</span></a>
		</li>

		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="select-photos"><i class="fa fa-camera"></i>Photos</a>
		</li>
		
		<li role="presentation">
			<a class="select-videos"><i class="fa fa-video"></i>Videos</a>
		</li>

		<li role="presentation">
			<a class="select-people"><i class="fa fa-user-friends"></i>People</a>
		</li>

		<li role="presentation">
			<a class="select-places"><i class="fa fa-map-marker-alt"></i>Places</a>
		</li>

		<li role="presentation">
			<a class="select-favorites"><i class="fa fa-map-pin"></i>Favorites</a>
		</li>
	`),

	events: {
		'click .select-all': 'onClickSelectAll',
		'click .select-none': 'onClickSelectNone',
		'click .select-invert': 'onClickSelectInvert',
		'click .select-multiple': 'onClickSelectMultiple',
		'click .select-photos': 'onClickSelectPhotos',
		'click .select-videos': 'onClickSelectVideos',
		'click .select-people': 'onClickSelectPeople',
		'click .select-places': 'onClickSelectPlaces',
		'click .select-favorites': 'onClickSelectFavorites'
	},

	//
	// querying methods
	//

	enabled: function() {
		let hasSelected = this.parent.app.hasSelected();
		let hasChildren = this.parent.app.hasChildren();
		let allSelected = false;

		return {
			'select-all': !allSelected,
			'select-none': hasSelected,
			'select-invert': hasSelected && !allSelected,
			'select-multiple': hasChildren,
			'select-photos': true,
			'select-videos': true,
			'select-people': true,
			'select-places': true,
			'select-favorites': true
		};
	},

	//
	// mouse event handling methods
	//

	onClickSelectAll: function() {
		this.parent.app.selectAll();
	},

	onClickSelectNone: function() {
		this.parent.app.deselectAll();
	},

	onClickSelectInvert: function() {
		this.parent.app.selectInvert();
	},

	onClickSelectMultiple: function() {
		this.parent.app.setMultiSelectable(this.toggleMenuItem('select-multiple'));
	},

	onClickSelectPhotos: function() {
		this.parent.app.selectLayer('photos');
	},

	onClickSelectVideos: function() {
		this.parent.app.selectLayer('videos');
	},

	onClickSelectPeople: function() {
		this.parent.app.selectLayer('people');
	},

	onClickSelectPlaces: function() {
		this.parent.app.selectLayer('places');
	},

	onClickSelectFavorites: function() {
		this.parent.app.selectLayer('favorites');
	}
});