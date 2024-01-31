/******************************************************************************\
|                                                                              |
|                            selected-shareable.js                             |
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

export default _.extend({}, ItemsShareable, {

	shareSelectedWithConnections: function(connections, options) {
		this.shareItemsByInvitation(this.getSelectedModels(), connections, _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));
	},

	shareSelectedByMessage: function(options) {
		this.shareItemsByMessage(this.getSelectedModels(), _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));			
	},

	shareSelectedByTopic: function(options) {
		this.shareItemsByTopic(this.getSelectedModels(), _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));			
	},

	shareSelectedByLink: function(options) {
		this.shareItemByLink(this.getSelectedModels()[0], _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));			
	},

	shareSelectedByEmail: function(options) {
		this.shareItemByEmail(this.getSelectedModels()[0], _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));			
	}
});