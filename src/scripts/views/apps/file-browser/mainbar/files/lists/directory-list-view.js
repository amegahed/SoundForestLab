/******************************************************************************\
|                                                                              |
|                            directory-list-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a directory list of items.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import File from '../../../../../../models/files/file.js';
import Directory from '../../../../../../models/files/directory.js';
import Volume from '../../../../../../models/files/volume.js';
import ListView from '../../../../../../views/items/lists/list-view.js';
import ContainableMappable from '../../../../../../views/maps/behaviors/containable-mappable.js';
import DirectoryItemView from '../../../../../../views/apps/file-browser/mainbar/files/lists/directory-item-view.js';
import FileItemView from '../../../../../../views/apps/file-browser/mainbar/files/lists/file-item-view.js';
import VolumeItemView from '../../../../../../views/apps/file-browser/mainbar/files/lists/volume-item-view.js';
import CssUtils from '../../../../../../utilities/web/css-utils.js';

export default ListView.extend(_.extend({}, ContainableMappable, {

	//
	// rendering methods
	//
	
	childView: function(item) {
		if (item instanceof Volume) {
			return VolumeItemView;
		} else if (item instanceof File) {
			return FileItemView;
		} else if (item instanceof Directory) {
			return DirectoryItemView;
		}
	},

	onRender: function() {

		// call superclass method
		//
		ListView.prototype.onRender.call(this);

		// apply file list icon styles
		//
		this.constructor.applyFileStyles(config.files.files.extensions);
	}
}), {

	//
	// static methods
	//

	applyFileStyles: function(fileExtensions) {

		// only execute once
		//
		if (this.file_styles_applied) {
			return;
		}

		// add style rules to set file list item icon colors
		//
		let keys = Object.keys(fileExtensions);
		for (let i = 0; i < keys.length; i++) {
			let extension = keys[i];
			let value = fileExtensions[extension];
			if (value.color) {
				CssUtils.addCssRule('body.colored .item-list .file:not(.selected):not(.highlighted).' + extension + ' .icon i:not(.fa-spinner)', {
					color: value.color
				});
			}
		}

		// done
		//
		this.file_styles_applied = true;
	}
});