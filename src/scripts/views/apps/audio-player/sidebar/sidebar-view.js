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
import FavoritesPanelView from '../../../../views/apps/audio-player/sidebar/panels/favorites-panel-view.js';
import TrackInfoPanelView from '../../../../views/apps/audio-player/sidebar/panels/track-info-panel-view.js';

export default SideBarView.extend({

	//
	// attributes
	//

	panels: ['favorites', 'track_info'],

	//
	// attribute methods
	//

	enabled: function() {
		let isSignedIn = application.isSignedIn();

		return {
			'favorites': isSignedIn,
			'track_info': true
		};
	},

	//
	// setting methods
	//

	setModel: function(model) {
		this.model = model;

		// update
		//
		this.showTrackInfoPanel();
	},

	//
	// panel rendering methods
	//
	
	showPanel: function(panel) {

		// show specified panel
		//
		switch (panel) {
			case 'favorites':
				this.showFavoritesPanel();
				break;
			case 'track_info':
				this.showTrackInfoPanel();
				break;
		}
	},

	showFavoritesPanel: function() {
		this.showChildView('favorites', new FavoritesPanelView({
			favorites: this.options.favorites,

			// callback options
			//
			onchange: this.options.onchange,
			onselect: this.options.onselect,
			ondeselect: this.options.ondeselect
		}));		
	},

	showTrackInfoPanel: function() {
		this.showChildView('track_info', new TrackInfoPanelView({
			model: this.model
		}));	
	},

	//
	// event handling methods
	//

	onChange: function() {

		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange();
		}
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {

		// check favorites keyboard shortcuts
		//
		if (this.hasChildView('favorites') && this.getChildView('favorites').onKeyDown) {
			this.getChildView('favorites').onKeyDown(event);
		}
	},

	//
	// window event handling methods
	//

	onResize: function(event) {

		// resize favorites view
		//
		if (this.hasChildView('favorites')) {
			this.getChildView('favorites').onResize(event);
		}
	}
});