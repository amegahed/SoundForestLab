/******************************************************************************\
|                                                                              |
|                              topic-card-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an card view of a news topic.                            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import CardView from '../../../../../../views/items/cards/card-view.js';
import Droppable from '../../../../../../views/behaviors/drag-and-drop/droppable.js';

export default CardView.extend(_.extend({}, Droppable, {
	
	//
	// attributes
	//

	template: template(`
		<div class="card">
		
			<div class="icon">
				<%= icon %>
			</div>
		
			<div class="info">
				<div class="row">
					<div class="name" spellcheck="false"><%= name %></div>
				</div>
		
				<div class="specifics row">
					<span class="details"><%= details %></span>
		
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
			</div>
		</div>
	`),

	events: _.extend({}, CardView.prototype.events, Droppable.events),

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