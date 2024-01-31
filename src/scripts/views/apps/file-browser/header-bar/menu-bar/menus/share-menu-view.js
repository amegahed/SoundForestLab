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
		let isHome = this.parent.app.isHome();
		let hasSelected = this.parent.app.hasSelected();
		let numSelected = this.parent.app.numSelected();
		let oneSelected = numSelected == 1;

		return {

			// share with connections
			//
			'share-with-connections': hasSelected || !isHome,
			'share-by-topic': hasSelected || !isHome,
			'share-by-message': hasSelected || !isHome,

			// share with anyone
			//
			'share-by-link': oneSelected || !isHome,
			'share-by-email': oneSelected || !isHome			
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