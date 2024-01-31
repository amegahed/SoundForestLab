/******************************************************************************\
|                                                                              |
|                            apps-list-item-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a single application list item.                |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ListItemView from '../../../../../views/items/lists/list-item-view.js';
import Browser from '../../../../../utilities/web/browser.js';

export default ListItemView.extend({

	//
	// attributes
	//

	tagName: 'li',
	className: 'item',

	template: template(`
		<div class="info">
		
			<div class="icon">
				<img src="images/icons/apps/<%= app %>.svg" />
				<i class="fa <%= icon %>"></i>
			</div>
		
			<div class="name" spellcheck="false"><%= name %></div>
		</div>
	`),

	events: _.extend({}, ListItemView.prototype.events, {
		'click': 'onClick'
	}),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: this.model.get('icon'),
			image: this.model.get('image'),
			name: this.model.get('name')
		};
	},

	onRender: function() {

		// call superclass method
		//
		ListItemView.prototype.onRender.call(this);

		// set disabled
		//
		if (this.model.has('disabled') && this.model.get('disabled')) {
			this.$el.addClass('disabled');
		}

		// add app color
		//
		let color = this.model.get('color');
		if (color) {
			this.$el.find('.icon').addClass(color + ' colored');
		}

		if (Browser.is_mobile) {

			// hide desktop only icons
			//
			if (this.model.has('platform') && this.model.get('platform') == 'desktop') {
				this.$el.hide();
			}
		} else {

			// hide mobile only icons
			//
			if (this.model.has('platform') && this.model.get('platform') == 'mobile') {
				this.$el.hide();
			}			
		}
	},

	//
	// mouse event handling methods
	//

	onClick: function(event) {

		// prevent multiple clicks
		//
		if (this.clicked || this.isLoading()) {
			return;
		}

		// call superclass method
		//
		ListItemView.prototype.onMouseDown.call(this, event);

		// perform callback
		//
		if (this.options.onclick) {
			this.options.onclick(this);
		}
	},

	onDoubleClick: function() {

		// do nothing
		//
	}
});