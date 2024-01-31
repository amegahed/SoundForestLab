/******************************************************************************\
|                                                                              |
|                           project-list-item-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a single task project list item.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ListItemView from '../../../../../../views/items/lists/list-item-view.js';
import Droppable from '../../../../../../views/behaviors/drag-and-drop/droppable.js';

export default ListItemView.extend(_.extend({}, Droppable, {
	
	//
	// attributes
	//

	template: template(`
		<div class="info">
		
			<div class="icon">
				<%= icon %>
			</div>
			
			<div class="name" spellcheck="false"><%= name %></div>
			
			<div class="specifics">
		
				<% if (public || private) { %>
				<div class="badges">
		
					<% if (public) { %>
					<div class="protection badge" data-toggle="tooltip" title="public" data-placement="right">
						<i class="fa fa-globe"></i>
					</div>
					<% } else if (private) { %>
					<div class="protection badge" data-toggle="tooltip" title="private" data-placement="right">
						<i class="fa fa-lock"></i>
					</div>
					<% } %>
				</div>
				<% } %>
		
				<span class="details"><%= details %></span>
			</div>
		</div>
	`),

	events: _.extend({}, ListItemView.prototype.events, Droppable.events),

	//
	// getting methods
	//

	getName: function() {
		return this.model.get('name');
	},

	getIcon: function() {
		return this.model.getIcon({
			max_size: Math.floor(this.thumbnailSize * (window.devicePixelRatio || 1))
		});
	},

	getDetails: function() {
		let kind = this.options.preferences? this.options.preferences.get('detail_kind') : undefined;
		if (kind) {
			return this.model.getAttribute(kind, this.options.preferences);
		}
	}
}));