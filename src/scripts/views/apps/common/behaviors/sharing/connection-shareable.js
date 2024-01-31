/******************************************************************************\
|                                                                              |
|                            connection-shareable.js                           |
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

import ItemsShareable from '../../../../../views/apps/common/behaviors/sharing/items-shareable.js';
import Browser from '../../../../../utilities/web/browser.js';

export default _.extend({}, ItemsShareable, {

	//
	// connection sharing methods
	//

	shareWithConnection: function(connection, items, options) {
		this.shareWithConnections([connection], items, options);
	},

	shareWithConnections: function(connections, items, options) {

		// check if items can be shared
		//
		if (items && !this.checkItemsShareable(items)) {
			return;
		}

		if (Browser.device == 'phone') {
			this.showShareItemsWithConnectionsDialog(items, connections, options);
		} else {
			this.showShareWithConnectionsDialog(connections, items, options);
		}
	},

	//
	// dialog rendering methods
	//

	showShareWithConnectionsDialog: function(connections, items, options) {
		import(
			'../../../../../views/apps/connection-manager/dialogs/sharing/share-with-connections-dialog-view.js'
		).then((ShareWithConnectionsDialogView) => {

			// show preferences dialog
			//
			this.show(new ShareWithConnectionsDialogView.default(_.extend({
				items: items,
				connections: connections,
				message: config.apps.file_browser.share_invitation_message
			}, options)));
		});
	},
});