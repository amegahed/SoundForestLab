/******************************************************************************\
|                                                                              |
|                               item-shareable.js                              |
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

import Browser from '../../../../../utilities/web/browser.js';

export default {

	//
	// checking methods
	//

	checkItemShareable: function(item) {

		// check if item has been saved
		//
		if (item.isSaved && !item.isSaved()) {

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
		} else if (item.isOwned && item.isOwned()) {

			// show notification
			//
			application.notify({
				icon: '<i class="fa fa-share"></i>',
				title: 'Sharing Error',
				message: "You must own items to be shared by invitation.  If you want to share an item has been shared with you, then you can make a copy of it to share. "
			});
			
			return false;				
		}

		return true;
	},

	//
	// item sharing methods
	//

	shareItemByInvitation: function(item, options) {

		// check if item can be shared
		//
		if (item && !this.checkItemShareable(item)) {
			return;
		}

		if (Browser.device == 'phone') {
			this.showShareItemsWithConnectionsDialog([item], null, options);
		} else {
			this.showShareItemsDialog([item], null, options);
		}
	},

	shareItemWithConnections: function(item, connections, options) {

		// check if item can be shared
		//
		if (item && !this.checkItemShareable(item)) {
			return;
		}

		if (Browser.device == 'phone') {
			this.showShareItemsWithConnectionsDialog([item], connections, options);
		} else {
			this.showShareItemsDialog([item], connections, options);
		}
	},

	//
	// item post sharing methods
	//

	shareItemByTopic: function(item) {
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

					// show selected topic
					//
					application.showTopic(topics[0], {
						items: [item],
						message: config.apps.file_browser.share_invitation_message
					});
				}
			});
		});
	},

	//
	// item chat message sharing methods
	//

	shareItemByMessage: function(item) {

		// select chats
		//
		this.showOpenChatsDialog({

			// callbacks
			//
			onopen: (chats) => {

				// show selected chat
				//
				application.showChat(chats[0], {
					items: [item],
					message: config.apps.file_browser.share_invitation_message
				});
			}
		});
	},

	//
	// item link sharing methods
	//

	shareItemByLink: function(item, options) {

		// check if item can be shared
		//
		if (!this.checkItemShareable(item)) {
			return;
		}

		// share item by link
		//
		if (item.get('num_links') > 0) {
			this.showShareByLinkDialog(item, options);
		} else {
			this.showNewLinkDialog(item, options);
		}
	},

	//
	// item email sharing methods
	//

	shareItemByEmail: function(item, options) {

		// check if item can be shared
		//
		if (!this.checkItemShareable(item)) {
			return;
		}

		this.showShareByEmailDialog(item, options);
	},

	//
	// dialog rendering methods
	//

	showOpenSubscribedTopicsDialog: function(options) {
		import(
			'../../../../../views/apps/topic-viewer/dialogs/topics/open-topics-dialog-view.js'
		).then((OpenTopicsDialogView) => {

			// show open dialog
			//
			this.show(new OpenTopicsDialogView.default({

				// options
				//
				title: "Open Topics",
				subscribed: true,

				// callbacks
				//
				onopen: (items) => {
					if (options && options.onopen) {
						options.onopen(items);
					}
				}
			}));
		});
	},

	showOpenChatsDialog: function(options) {
		import(
			'../../../../../views/apps/chat-viewer/dialogs/chats/open-chats-dialog-view.js'
		).then((OpenChatsDialogView) => {

			// show open dialog
			//
			this.show(new OpenChatsDialogView.default({

				// options
				//
				title: "Open Chats",

				// callbacks
				//
				onopen: (items) => {
					if (options && options.onopen) {
						options.onopen(items);
					}
				}
			}));
		});
	},

	showShareItemsDialog: function(items, connections, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/share-requests/dialogs/share-items-dialog-view.js'
		).then((ShareItemsDialogView) => {

			// show share items dialog
			//
			this.show(new ShareItemsDialogView.default(_.extend({
				items: items,
				connections: connections,
				message: config.apps.file_browser.share_invitation_message
			}, options)));
		});
	},

	showShareItemsWithConnectionsDialog: function(items, connections, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/share-requests/dialogs/share-items-with-connections-dialog-view.js'
		).then((ShareItemsWithConnectionsDialogView) => {

			// show share items with connections dialog
			//
			this.show(new ShareItemsWithConnectionsDialogView.default(_.extend({
				items: items,
				connections: connections,
				message: config.apps.file_browser.share_invitation_message
			}, options)));
		});
	},

	showShareByLinkDialog: function(item, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/links/dialogs/share-by-link-dialog-view.js'
		).then((ShareByLinkDialogView) => {

			// show share by link dialog
			//
			this.show(new ShareByLinkDialogView.default(_.extend({
				model: item
			}, options)));
		});
	},

	showNewLinkDialog: function(item, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/links/dialogs/new-link-dialog-view.js'
		).then((NewLinkDialogView) => {

			// show new link dialog
			//
			this.show(new NewLinkDialogView.default(_.extend({
				target: item
			}, options)));
		});
	},

	showShareByEmailDialog: function(item, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/mail/dialogs/share-by-email-dialog-view.js'
		).then((ShareByEmailDialogView) => {

			// show share by email dialog
			//
			this.show(new ShareByEmailDialogView.default(_.extend({
				model: item
			}, options)));
		});
	}
};