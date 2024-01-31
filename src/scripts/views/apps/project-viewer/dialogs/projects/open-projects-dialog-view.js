/******************************************************************************\
|                                                                              |
|                        open-projects-dialog-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a dialog box to open selected projects.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import DialogView from '../../../../../views/dialogs/dialog-view.js';
import ProjectBrowserView from '../../../../../views/apps/project-browser/project-browser-view.js';

export default DialogView.extend({

	//
	// attributes
	//
	
	className: 'modal dialog',

	template: template(`
		<div class="modal-dialog">
			
			<div class="modal-header">
				<div class="heading">
					<div class="icon">
						<%= icon %>
					</div>
					<div class="title">
						<%= title %>
					</div>
				</div>
			</div>
		
			<div class="modal-content">
				<div class="modal-body"></div>
				
				<div class="modal-footer">			
					<div class="buttons">
						<button class="open btn btn-primary" data-dismiss="modal" disabled>
							<i class="fa fa-check"></i>Open
						</button>
						<button class="cancel btn" data-dismiss="modal">
							<i class="fa fa-xmark"></i>Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	`),

	regions: {
		body: {
			el: '.modal-body',
			replaceElement: true
		}
	},

	events: _.extend({}, DialogView.prototype.events, {
		'click button.open': 'onClickOpenButton'
	}),

	//
	// dialog attributes
	//
	
	icon: '<i class="fa fa-folder-open"></i>',
	title: "Open Projects",

	//
	// constructor
	//

	initialize: function() {

		// set attributes
		//
		if (this.options.title) {
			this.title = this.options.title;
		}

		// call superclass constructor
		//
		DialogView.prototype.initialize.call(this);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: this.icon,
			title: this.title
		};
	},

	onRender: function() {
		
		// call superclass method
		//
		DialogView.prototype.onRender.call(this);

		// show child views
		//
		this.showChatBrowser();
	},

	showChatBrowser: function() {
		this.showChildView('body', new ProjectBrowserView({

			// options
			//
			selected: this.options.selected,
			dialog: this,
			hidden: {
				'footer-bar': true
			},
			
			// callbacks
			//
			onopen: (items) => this.onOpen(items),
			onchange: () => this.onChange(),
			onselect: () => this.update(),
			ondeselect: () => this.update()
		}));
	},

	update: function() {

		// update buttons
		//
		this.$el.find('.modal-footer .open').prop('disabled', 
			!this.getChildView('body').hasSelected());
	},

	//
	// mouse event handling methods
	//

	onClickOpenButton: function() {
		let selected = this.getChildView('body').getSelectedModels();

		// open selected item
		//
		if (selected && this.options.onopen) {
			this.options.onopen(selected);	
		}

		this.close();
	},

	//
	// file event handling methods
	//

	onOpen: function(items) {

		// close dialog
		//
		this.hide();

		// open selected items
		//
		if (items && this.options.onopen) {
			return this.options.onopen(items);
		}
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		this.getChildView('body').onKeyDown(event);
	}
});