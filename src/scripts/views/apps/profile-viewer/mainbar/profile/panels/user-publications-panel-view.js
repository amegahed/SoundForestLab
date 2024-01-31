/******************************************************************************\
|                                                                              |
|                        user-publications-panel-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a read-only view of the user's publications.             |
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
import Expandable from '../../../../../../views/behaviors/expanders/expandable.js';
import UserPublicationsView from '../../../../../../views/apps/profile-viewer/mainbar/profile/items/publications/user-publications-view.js';

export default BaseView.extend(_.extend({}, Expandable, {

	//
	// attributes
	//

	tagName: 'form',
	className: 'expandable form-horizontal panel',

	template: template(`
		<div class="header info">
		
			<% if (heading) { %>
			<div class="heading"><% if (icon) { %><div class="icon"><%= icon %></div><% } %><%= heading %></div>
			<% } %>
			
			<% if (editable) { %>
			<div class="buttons">
				<% if (expandable) { %>
				<div class="expander">
					<button type="button" class="collapse btn btn-sm">
						<i class="fa fa-caret-up"></i>
					</button>
					<button type="button" class="expand btn btn-sm">
						<i class="fa fa-caret-down"></i>	
					</button>
				</div>
				<% } %>
		
				<% if (editable) { %>
				<button type="button" class="add success btn btn-sm" data-toggle="tooltip" title="Add Publication">
					<i class="fa fa-plus"></i>
				</button>
				<% } %>
			</div>
			<% } %>
		</div>
		
		<div class="items"></div>
	`),

	regions: {
		items: '.items'
	},

	events: {
		'click .heading': 'onClickHeading',
		'click .expander': 'onClickExpander',
		'click .add': 'onClickAdd'
	},

	//
	// querying methods
	//

	hasSelected: function() {
		if (this.hasChildView('items')) {
			return this.getChildView('items').hasSelected();
		}
	},

	//
	// getting methods
	//

	getSelected: function() {
		return this.getChildView('items').getSelected();
	},

	getSelectedModels: function() {
		return this.getChildView('items').getSelectedModels();
	},
	
	//
	// adding methods
	//

	addItem: function() {
		import(
			'../../../../../../views/apps/profile-viewer/mainbar/profile/dialogs/add/add-user-publication-dialog-view.js'
		).then((AddUserPublicationDialogView) => {
			
			// show add dialog
			//
			application.show(new AddUserPublicationDialogView.default({

				// callbacks
				//
				onadd: (model) => {
					this.collection.add(model);

					// update view
					//
					if (this.collection.length == 1) {
						this.render();
					}
				}
			}));
		});
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: this.options.icon,
			heading: this.options.heading,

			// capabilities
			//
			expandable: this.options.expandable,
			editable: this.options.editable
		};
	},

	onRender: function() {
		
		// show child views
		//
		this.showUserPublications();
	},

	showUserPublications: function() {
		this.showChildView('items', new UserPublicationsView({
			collection: this.collection,

			// options
			//
			countries: this.options.countries,
			multicolumn: this.options.multicolumn,
			empty: "No publications.",

			// capabilities
			//
			expandable: this.options.expandable,
			selectable: this.options.selectable,
			draggable: this.options.draggable,
			droppable: this.options.droppable,
			editable: this.options.editable,

			// callbacks
			//
			onselect: this.options.onselect,
			ondeselect: this.options.ondeselect,
			onadd: this.options.onadd,
			onremove: this.options.onremove
		}));
	},

	//
	// mouse event handling methods
	//

	onClickHeading: function() {
		if (this.hasChildView('items')) {
			this.getChildView('items').deselectAll();
		}
	},
	
	onClickExpander: function() {
		this.toggleCollapse({
			recursive: true
		});
	},

	onClickAdd: function() {
		this.addItem();
	}
}));