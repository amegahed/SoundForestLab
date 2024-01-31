/******************************************************************************\
|                                                                              |
|                           selectable-shareable.js                            |
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

import SelectedShareable from '../../../../../views/apps/common/behaviors/sharing/selected-shareable.js';
import ModelShareable from '../../../../../views/apps/common/behaviors/sharing/model-shareable.js';

export default _.extend({}, SelectedShareable, ModelShareable, {

	shareWithConnections: function(connections, options) {
		if (this.hasSelected()) {
			this.shareSelectedWithConnections(connections, options);
		} else {
			this.shareModelWithConnections(options);
		}
	},

	shareByTopic: function(options) {
		if (this.hasSelected()) {
			this.shareSelectedByTopic(options);
		} else {
			this.shareModelByTopic(options);
		}
	},

	shareByMessage: function(options) {
		if (this.hasSelected()) {
			this.shareSelectedByMessage(options);
		} else {
			this.shareModelByMessage(options);
		}
	},

	shareByLink: function(options) {
		if (this.hasSelected()) {
			this.shareSelectedByLink(options);
		} else {
			this.shareModelByLink(options);
		}
	},

	shareByEmail: function(options) {
		if (this.hasSelected()) {
			this.shareSelectedByEmail(options);
		} else {
			this.shareModelByEmail(options);
		}
	}
});