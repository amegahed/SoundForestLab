/******************************************************************************\
|                                                                              |
|                              items-shareable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for views that deal with sharable items       |
|        (files and directories).                                              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ItemShareable from '../../../../../views/apps/common/behaviors/sharing/item-shareable.js';
import Browser from '../../../../../utilities/web/browser.js';

export default _.extend({}, ItemShareable, {

	//
	// checking methods
	//

	checkItemsShareable: function(items) {

		// check if items have been saved
		//
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			if (item) {

				// check if item has been saved
				//
				if (!item.isSaved()) {

					// show notification
					//
					application.notify({
						icon: '<i class="fa fa-share"></i>',
						title: 'Sharing Error',
						message: "You must save these items before they can be shared by invitation."
					});
					
					return false;

				// check if item is owned
				//
				} else if (item.isOwned()) {

					// show notification
					//
					application.notify({
						icon: '<i class="fa fa-share"></i>',
						title: 'Sharing Error',
						message: "You must own items to be shared by invitation.  If you want to share an item has been shared with you, then you can make a copy of it to share. "
					});
					
					return false;				
				}
			}
		}

		return true;
	},

	//
	// item sharing methods
	//

	shareItemsByInvitation: function(items, options) {

		// check if items can be shared
		//
		if (items && !this.checkItemsShareable(items)) {
			return;
		}

		if (Browser.device == 'phone') {
			this.showShareItemsWithConnectionsDialog(items, null, options);
		} else {
			this.showShareItemsDialog(items, null, options);
		}
	},

	shareItemsWithConnections: function(items, connections, options) {

		// check if items can be shared
		//
		if (items && !this.checkItemsShareable(items)) {
			return;
		}

		if (Browser.device == 'phone') {
			this.showShareItemsWithConnectionsDialog(items, connections, options);
		} else {
			this.showShareItemsDialog(items, connections, options);
		}
	},

	shareItemsByTopic: function(items) {
		import(
			'../../../../../views/apps/topic-viewer/topic-viewer-view.js'
		).then((TopicViewerView) => {

			// select topics
			//
			this.showOpenSubscribedTopicsDialog({
				model: TopicViewerView.default.default_topic,

				// callbacks
				//
				onopen: (topics) => {
					application.showTopic(topics[0], {
						items: items,
						message: config.apps.file_browser.share_invitation_message
					});
				}
			});
		});
	},

	shareItemsByMessage: function(items) {

		// select chats
		//
		this.showOpenChatsDialog({

			// callbacks
			//
			onopen: (chats) => {

				// show selected chat
				//
				application.showChat(chats[0], {
					items: items,
					message: config.apps.file_browser.share_invitation_message
				});
			}
		});
	}
});