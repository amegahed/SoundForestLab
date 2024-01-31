/******************************************************************************\
|                                                                              |
|                              item-badges-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a file or directory badges.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../../../../../views/base-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'badges',

	template: template(`
		<% if (has_geolocation) { %>
		<div class="geolocation active badge" data-toggle="tooltip" title="view on map" data-placement="bottom">
			<i class="fa fa-globe-americas"></i>
		</div>
		<% } %>

		<% if (has_geoposition) { %>
		<div class="geoposition active badge" data-toggle="tooltip" title="view on map" data-placement="bottom">
			<i class="fa fa-map"></i>
		</div>
		<% } %>
		
		<% if (num_shares) { %>
		<div class="shares active badge" data-toggle="tooltip" title="shared with <%= num_shares %> connection<% if (num_shares > 1) { %>s<% } %>" data-placement="bottom">
			<i class="fa fa-user"></i>
			<span class="num-shares"><%= num_shares %></span>
		</div>
		<% } %>
		
		<% if (num_links) { %>
		<div class="links active badge" data-toggle="tooltip" title="has <%= num_links %> link<% if (num_links > 1) { %>s<% } %>" data-placement="bottom">
			<i class="fa fa-link"></i>
			<span class="num-links"><%= num_links %></span>
		</div>
		<% } %>	
	`),

	events: {
		'mousedown .geolocation': 'onMouseDownGeolocation',
		'mousedown .geoposition': 'onMouseDownGeoposition',
		'mousedown .shares': 'onMouseDownShares',
		'mousedown .links': 'onMouseDownLinks'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			has_geolocation: this.model.hasGeolocation && this.model.hasGeolocation(),
			has_geoposition: this.model.hasGeoposition && this.model.hasGeoposition()
		};
	},

	//
	// mouse event handling methods
	//

	onMouseDownGeolocation: function(event) {

		// block event from parent
		//
		this.block(event);

		// view item on map
		//
		application.launch('map_viewer', {
			model: this.model
		}, {
			new_window: true
		});
	},

	onMouseDownGeoposition: function(event) {

		// block event from parent
		//
		this.block(event);

		// view item on map
		//
		application.launch('map_viewer', {
			model: this.model
		}, {
			new_window: true
		});
	},

	onMouseDownShares: function(event) {

		// block event from parent
		//
		this.block(event);

		// show file info dialog
		//
		this.model.showShareRequests();
	},

	onMouseDownLinks: function(event) {

		// block event from parent
		//
		this.block(event);

		// show file info dialog
		//
		this.model.showLinks();
	}
});