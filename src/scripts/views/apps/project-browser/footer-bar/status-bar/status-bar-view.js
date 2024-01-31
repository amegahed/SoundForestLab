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
		<% if (show_size_input) { %>
		<div class="inline input toolbar">
			<input class="size" type="range" min="0" max="2" step="1" value="<%= size %>" />
		</div>
		<% } %>
		
		<% if (show_magnify) { %>
		<div class="icon-size toolbar">
			<div class="magnify button btn-sm"<% if (magnified) { %> style="display:none"<% } %> data-toggle="tooltip" title="Magnify" data-placement="top"><i class="fa fa-search-plus"></i></div>
		
			<div class="unmagnify button btn-sm"<% if (!magnified) { %> style="display:none"<% } %> data-toggle="tooltip" title="Unmagnify" data-placement="top"><i class="fa fa-search-minus"></i></div>
		</div>
		<% } %>
		
		<span class="num-items info-bar">
		<i class="fa fa-clipboard"></i>
		<% if (num_selected > 0 && num_items > 0) { %>
			<% if (is_mobile) { %>
			<%= num_selected %> selected
			<% } else { %>
			<%= num_selected %> of <%= num_items %> projects selected
			<% } %>
		<% } else { %>
			<%= num_items %> projects
		<% } %>
		</span>
	`),

	events: {
		'input input.size': 'onChangeSizeSlider'
	},

	//
	// getting methods
	//

	getTileSize: function() {
		let size = parseInt(this.$el.find('.size').val());
		return this.integerToSize(size);
	},

	//
	// converting methods
	//

	sizeToInteger: function(size) {
		switch (size) {
			case 'small':
				return 0;
			case 'medium':
				return 1;
			case 'large':
				return 2;
			default:
				return 1;
		}
	},

	integerToSize: function(value) {
		switch (value) {
			case 0:
				return 'small';
			case 1:
				return 'medium';
			case 2:
				return 'large';
			default:
				return 'medium';
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		let app = this.getParentView('app');

		return {
			num_items: app.collection? app.collection.length : 0,
			num_selected: app.numSelected(),
			show_magnify: false,
			show_size_input: app.preferences.get('view_kind') == 'tiles',
			size: this.sizeToInteger(app.preferences.get('tile_size')),
			is_mobile: Browser.is_mobile
		};
	},

	//
	// event handling methods
	//

	onLoad: function() {
		this.update();
	},

	onChange: function() {
		this.update();
	},

	onChangeSizeSlider: function() {

		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange('tile_size', this.getTileSize());
		}
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