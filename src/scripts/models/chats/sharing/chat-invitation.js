/******************************************************************************\
|                                                                              |
|                              chat-invitation.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an invitation to join a chat session.         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Timestamped from '../../../models/utilities/timestamped.js';
import User from '../../../models/users/user.js';
import Connection from '../../../models/users/connections/connection.js';

export default Timestamped.extend({

	//
	// ajax attributes
	//

	urlRoot: config.servers.api + '/chats/invitations',

	//
	// accepting methods
	//

	accept: function(options) {
		return $.ajax(_.extend({
			url: this.url() + '/accept',
			type: 'PUT'
		}, options));
	},

	decline: function(options) {
		return $.ajax(_.extend({
			url: this.url() + '/decline',
			type: 'PUT'
		}, options));
	},

	//
	// parsing (Backbone) methods
	//

	parse: function(response) {

		// call superclass method
		//
		let data = Timestamped.prototype.parse.call(this, response);

		// parse attributes
		//
		if (data.sender) {
			data.sender = new User(data.sender, {
				parse: true
			});
		}
		if (data.recipient) {
			data.recipient = new Connection(data.recipient, {
				parse: true
			});
		}

		return data;
	}
});
