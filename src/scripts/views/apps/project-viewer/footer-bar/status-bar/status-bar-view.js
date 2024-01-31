/******************************************************************************\
|                                                                              |
|                              status-bar-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of an application's status information.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../../../../views/base-view.js';
import Browser from '../../../../../utilities/web/browser.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'status-bar',

	template: template(`
		<span class="info-bar">
			<i class="fa fa-check"></i>
			<% if (num_selected > 0 && num_tasks > 0) { %>
			<% if (is_mobile) { %>
			<%= num_selected %> selected
			<% } else { %>
			<%= num_selected %> of <%= num_tasks %> tasks selected
			<% } %>
			<% } else if (num_tasks != undefined) { %>
			<%= num_tasks %> tasks
			<% } else { %>
			Loading...
			<% } %>
		</span>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			num_tasks: this.parent.app.numTasks(),
			num_selected: this.parent.app.numSelected(),
			is_mobile: Browser.is_mobile
		};
	},

	//
	// event handling methods
	//

	onLoad: function() {
		this.update();
	},

	onChangeTab: function() {
		this.update();
	},

	//
	// selection event handling methods
	//

	onSelect: function() {
		this.update();
	},

	onDeselect: function() {
		this.update();
	}
});