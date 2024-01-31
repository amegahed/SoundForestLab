/******************************************************************************\
|                                                                              |
|                               share-menu-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying share dropdown menus.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ShareMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/share-menu-view.js';

export default ShareMenuView.extend({
	
	//
	// querying methods
	//

	enabled: function() {
		let hasSelectedItems = this.parent.app.hasSelectedItems();
		let hasSelectedPhotos = this.parent.app.hasSelectedLayerItems('photos');
		let hasSelectedVideos = this.parent.app.hasSelectedLayerItems('videos');
		let hasSelected = hasSelectedItems || hasSelectedPhotos || hasSelectedVideos;
		let isSaved = this.parent.app.hasActiveModel() && this.parent.app.getActiveModel().isSaved();
		let hasShareable = hasSelected || isSaved;

		return {
			'share-with-connections': hasShareable,
			'share-by-topic': hasShareable,
			'share-by-message': hasShareable,

			// share with anyone
			//
			'share-by-link': hasShareable,
			'share-by-email': hasShareable		
		};
	},

	//
	// mouse event handling methods
	//

	onClickShareWithConnections: function() {
		this.parent.app.shareWithConnections();
	},

	onClickShareByTopic: function() {
		this.parent.app.shareByTopic();
	},

	onClickShareByMessage: function() {
		this.parent.app.shareByMessage();
	},

	onClickShareByLink: function() {
		this.parent.app.shareByLink();
	},

	onClickShareByEmail: function() {
		this.parent.app.shareByEmail();
	}
});