/******************************************************************************\
|                                                                              |
|                              help-cover-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for viewing help pages.                      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import HelpPageView from '../../../../views/apps/help-viewer/mainbar/help-page-view.js';

export default HelpPageView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="contents container">
			<h1>
				<i class="<%= icon %>"></i>
				<%= name %>
			</h1>

			<ol class="breadcrumb">
				<li><i class="fa fa-question-circle"></i>Help</li>
			</ol>
		
			<div class="content">
				<div class="attention icon">
					<i class="<%= icon %>"></i>	
				</div>

				<div style="text-align:center">
					<h2>Version <%= version %></h2>
				</div>
			</div>
		</div>
	`),

	className: 'page',

	regions: {
		container: '.container'
	},

	events: {
		'click .title-icon': 'onClickTitleIcon'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: this.model.get('icon'),
			name: this.model.get('name'),
			version: this.model.get('version')
		};
	},

	//
	// mouse event handling methods
	//

	onClickTitleIcon: function() {
		this.parent.parent.setAddress('#help');
	}
});