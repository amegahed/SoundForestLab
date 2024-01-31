/******************************************************************************\
|                                                                              |
|                                prev-button-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for a particular type of toolbar button.        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ButtonView from '../../../../../../views/apps/common/toolbars/buttons/button-view.js';

export default ButtonView.extend({

	//
	// attributes
	//
	
	template: '<i class="fa fa-backward"></i>',

	//
	// rendering methods
	//

	onRender: function() {

		// set initial state
		//
		this.setDisabled(!this.parent.pageNumber || this.parent.pageNumber == 1 || 
			!this.parent.numPages || this.parent.numPages == 1);
	},

	//
	// mouse event handling methods
	//

	onClick: function() {
		if (this.parent.pageNumber > 1) {

			// go to prev
			//
			this.getParentView('app').setPageNumber(this.parent.pageNumber - 1);
		} else {

			// wraparound
			//
			this.getParentView('app').setPageNumber(this.parent.numPages);
		}
	}
});
