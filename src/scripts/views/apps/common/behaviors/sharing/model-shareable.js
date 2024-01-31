/******************************************************************************\
|                                                                              |
|                             model-shareable.js                               |
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

export default _.extend({}, ItemShareable, {

	//
	//
	// sharing methods
	//

	shareModelWithConnections: function(options) {
		this.shareItemByInvitation(this.getModel? this.getModel() : this.model, _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));
	},

	shareModelByTopic: function(options) {
		this.shareItemByTopic(this.getModel? this.getModel() : this.model, _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));			
	},

	shareModelByMessage: function(options) {
		this.shareItemByMessage(this.getModel? this.getModel() : this.model, _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));			
	},

	shareModelByLink: function(options) {
		this.shareItemByLink(this.getModel? this.getModel() : this.model, _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));			
	},

	shareModelByEmail: function(options) {
		this.shareItemByEmail(this.getModel? this.getModel() : this.model, _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));
	}
});