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

import ButtonView from '../../../../../views/apps/common/toolbars/buttons/button-view.js';

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
		this.setDisabled(!this.parent.numItems || this.parent.numItems == 1);
	},

	//
	// mouse event handling methods
	//

	onClick: function() {
		if (this.parent.itemNumber > 1) {

			// go to prev
			//
			this.parent.parent.setItemNumber(this.parent.itemNumber - 1);
		} else {

			// wraparound
			//
			this.parent.parent.setItemNumber(this.parent.numItems);
		}
	}
});
