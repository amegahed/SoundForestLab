/******************************************************************************\
|                                                                              |
|                             image-split-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for displaying image files.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SplitView from '../../../../views/layout/split-view.js';
import ImageView from '../../../../views/apps/image-viewer/mainbar/image-view.js';
import ImageInfoView from '../../../../views/apps/image-viewer/mainbar/image-info-view.js';

export default SplitView.extend({

	//
	// attributes
	//

	orientation: 'vertical',
	flipped: true,

	//
	// setting methods
	//

	setOption: function(key, value) {
		switch (key) {
			
			// mainbar options
			//
			case 'show_image_info':
				this.setSideBarVisibility(value);
				break;
			case 'info_bar_size':
				this.setSideBarSize(value);
				break;

			default:
				this.getChildView('mainbar').setOption(key, value);
		}
	},

	//
	// rendering methods
	//

	getSideBarView: function() {
		return new ImageInfoView({
			model: this.model
		});
	},

	getContentView: function() {
		return new ImageView({
			model: this.model,

			// options
			//
			preferences: this.options.preferences,

			// callbacks
			//
			onload: this.options.onload,
			onerror: this.options.onerror
		});
	}
});