/******************************************************************************\
|                                                                              |
|                            key-value-list-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view that shows a list of key value pairs.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2015-2018, Megahed Labs LLC, www.optipedia.org          |
\******************************************************************************/

import BaseModel from '../../../../models/base-model.js';
import BaseCollection from '../../../../collections/base-collection.js';
import TableListView from '../../../../views/collections/tables/table-list-view.js';
import KeyValueListItemView from '../../../../views/collections/lists/key-value-list/key-value-list-item-view.js';
import '../../../../../vendor/bootstrap/js/popover.js';

export default TableListView.extend({

	//
	// attributes
	//

	template: _.template(`
		<% if (collection && collection.length > 0) { %>
		<table>
			<thead>
				<tr>
					<% if (numbered) { %>
					<th class="prepend number"></th>
					<% } %>
				
					<th class="key first">
						<i class="fa fa-key"></i>
						<span>Key</span>
					</th>
		
					<th class="value<% if (!editable) { %> last<% } %>">
						<i class="fa fa-tag"></i>
						<span>Value</span>
					</th>
		
					<% if (orderable) { %>
					<th class="order narrow last">
						<i class="fa fa-list"></i>
						<span>Order</span>
					</th>
					<% } %>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<% } else { %>
		<p>No key value pairs.</p>
		<% } %>
		
		<% if (expandable) { %>
		<div class="top buttons">
			<button type="button" class="add btn btn-sm" id="add-new-pair" class="btn btn-sm" data-toggle="tooltip" data-content="Add new key value pair" data-placement="left" tabindex="-1"><i class="fa fa-plus"></i></button>
		</div>
		<% } %>
	`),

	childView: KeyValueListItemView,

	events: {
		'click #add-new-pair': 'onClickAddNewPair',
	},

	//
	// constructor
	//

	initialize: function() {

		// create collection from key value pairs
		//
		this.collection = new BaseCollection();
		if (this.options.array) {
			for (let key in this.options.array) {
				this.collection.add(new BaseModel({
					key: key,
					value: this.options.array[key]
				}));
			}
		}

		// call superclass method
		//
		TableListView.prototype.initialize.call(this);
	},

	//
	// querying methods
	//

	toData: function() {

		// create key value pairs from collection
		//
		let object = new Object;
		for (let i = 0; i < this.collection.length; i++) {
			let model = this.collection.at(i);
			let key = model.get('key');
			let value = model.get('value');
			object[key] = value;
		}
		return object;
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			collection: this.collection,
			numbered: this.options.numbered,
			editable: this.options.editable,
			orderable: this.options.orderable,
			deletable: this.options.deletable,
			expandable: this.options.expandable
		};
	},

	childViewOptions: function(model) {
		return {
			model: model,
			index: this.collection.indexOf(model),
			collection: this.collection,
			numbered: this.options.numbered,
			editable: this.options.editable,
			orderable: this.options.orderable,
			deletable: this.options.deletable,
			expandable: this.options.expandable,
			parent: this
		}
	},

	onRender: function() {

		// add popover triggers
		//
		this.addPopovers();
	},

	addPopovers: function() {

		// show popovers on hover
		//
		this.$el.find('[data-toggle="popover"]').popover({
			trigger: 'hover'
		});
	},

	//
	// event handling methods
	//

	onClickAddNewPair: function() {
		this.collection.add(
			new BaseModel({
				key: 'untitled',
				value: undefined
			})
		);

		// re-render list
		//
		this.render();
	},
});
