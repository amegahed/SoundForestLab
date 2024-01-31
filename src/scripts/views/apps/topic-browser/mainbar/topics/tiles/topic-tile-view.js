/******************************************************************************\
|                                                                              |
|                              topic-tile-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an tile view of a news topic.                            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import TileView from '../../../../../../views/items/tiles/tile-view.js';
import Droppable from '../../../../../../views/behaviors/drag-and-drop/droppable.js';

export default TileView.extend(_.extend({}, Droppable, {
	
	//
	// attributes
	//

	template: template(`
		<div class="tile">
		
			<div class="icon">
				<%= icon %>
			</div>
		
			<div class="name" spellcheck="false"><%= name %></div>
				
			<% if (public || private || subscribed) { %>
			<div class="badges">
		
				<% if (public) { %>
				<div class="protection badge" data-toggle="tooltip" title="public" data-placement="bottom">
					<i class="fa fa-globe"></i>
				</div>
				<% } else if (private) { %>
				<div class="protection badge" data-toggle="tooltip" title="private" data-placement="bottom">
					<i class="fa fa-lock"></i>
				</div>
				<% } %>
				<% if (subscribed) { %>
				<div class="subscribed success badge" data-toggle="tooltip" title="subscribed" data-placement="bottom">
					<i class="fa fa-newspaper"></i>
				</div>
				<% } %>
			</div>
			<% } %>
		</div>
		
		<div class="specifics">
			<span class="details"><%= details %></span>
		</div>
	`),

	events: _.extend({}, TileView.prototype.events, Droppable.events),

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