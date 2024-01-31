/******************************************************************************\
|                                                                              |
|                                pager-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for navigation using page controls.          |
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

export default BaseView.extend({

	//
	// attributes
	//

	className: 'pager',

	template: template(`
		<div class="items-per-page">
			<input class="title" size="2" <% if (items_per_page > 0) { %>value="<%= items_per_page %>"<% } %>>
			<label class="title"><%= item_type %> / page</label>
		</div>
		
		<div class="btn-group">
			<button type="button" class="first btn btn-sm" data-toggle="tooltip" title="First" data-placement="top"<% if (page_number == 1) { %> disabled<% } %>>
				<i class="fa fa-fast-backward"></i>
			</button>
		
			<button type="button" class="prev btn btn-sm" data-toggle="tooltip" title="Prev" data-placement="top"<% if (page_number == 1) { %> disabled<% } %>>
				<i class="fa fa-backward"></i>
			</button>
		
			<span class="page-info">
				<input class="page-number" value="<%= page_number %>" data-toggle="tooltip" title="Page #" data-placement="top">
			</span>
		
			<button type="button" class="next btn btn-sm" data-toggle="tooltip" title="Next" data-placement="top">
				<i class="fa fa-forward"></i>
			</button>
		</div>
	`),

	events: {
		'change .items-per-page input': 'onChangeItemsPerPage',
		'click .first': 'onClickFirst',
		'click .prev': 'onClickPrev',
		'change .page-number': 'onChangePageNumber',
		'click .next': 'onClickNext',
		'click .last': 'onClickLast'
	},

	//
	// constructor
	//

	initialize: function() {
		this.itemsPerPage = this.options.itemsPerPage || 10;
		this.pageNumber = this.options.pageNumber || 1;
		this.itemType = this.options.itemType || 'items';
	},

	//
	// getting methods
	//

	getItemsPerPage: function() {
		return parseInt(this.$el.find('.items-per-page input').val());
	},

	getPageNumber: function() {
		return parseInt(this.$el.find('.page-number').val());
	},

	getRange: function() {

		// get range limits
		//
		let pageNumber = this.getPageNumber();
		let itemsPerPage = this.getItemsPerPage();

		return {
			from: (pageNumber - 1) * itemsPerPage,
			to: pageNumber * itemsPerPage
		};
	},

	//
	// setting methods
	//

	setNumItems: function(numItems) {
		let range = this.getRange();
		let num = range.to - range.from;
		this.setNextDisabled(numItems < num);
	},

	setItemsPerPage: function(itemsPerPage) {
		this.$el.find('.items-per-page input').val(itemsPerPage);	
	},

	setPageNumber: function(pageNumber) {
		this.$el.find('.page-number').val(pageNumber);

		// enable / disable buttons
		//
		this.update();

		// perform callback
		//
		this.onChange(pageNumber);
	},

	setNextDisabled: function(disabled) {
		this.$el.find('.next').prop('disabled', disabled !== false);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			item_type: this.itemType,
			items_per_page: this.itemsPerPage,
			page_number: this.pageNumber
		};
	},

	onRender: function() {
		this.addTooltips({
			container: this.parent.$el
		});
	},

	update: function() {
		let pageNumber = this.getPageNumber();
		this.$el.find('.first').prop('disabled', pageNumber == 1);
		this.$el.find('.prev').prop('disabled', pageNumber == 1);
	},

	//
	// event handling methods
	//

	onChange: function() {
		this.removeTooltips();

		// enable / disable next button
		//
		this.setNextDisabled(this.collection.length <= this.itemsPerPage);

		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange(this.getPageNumber());
		}
	},

	onChangeItemsPerPage: function() {
		let itemsPerPage = this.getItemsPerPage();
		if (itemsPerPage <= 0) {
			this.setItemsPerPage(1);
		} else if (itemsPerPage > this.options.maxItemsPerPage) {
			this.setItemsPerPage(this.options.maxItemsPerPage);
		} else if (isNaN(itemsPerPage)) {
			this.setItemsPerPage(this.options.itemsPerPage);
		}
		this.onChange();
	},

	onClickFirst: function() {
		this.setPageNumber(1);
	},

	onClickPrev: function() {
		this.setPageNumber(this.getPageNumber() - 1);
	},

	onChangePageNumber: function() {
		let pageNumber = this.getPageNumber();
		if (pageNumber <= 0 || isNaN(pageNumber)) {
			this.setPageNumber(1);
		} else if (pageNumber > this.numPages) {
			this.setPageNumber(this.numPages);
		}
	},

	onClickNext: function() {
		this.setPageNumber(this.getPageNumber() + 1);
	}
});