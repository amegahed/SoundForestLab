/******************************************************************************\
|                                                                              |
|                               file-icon-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a file icon and name.                          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ItemIconView from '../../../../../../views/apps/file-browser/mainbar/files/icons/item-icon-view.js';

export default ItemIconView.extend({

	//
	// attribute methods
	//

	className: function() {
		let name = '';
		let extension = this.model.getFileExtension().toLowerCase();

		// add system tag
		//
		if (this.isHidden()) {
			name += 'system';
		}

		// add extension
		//
		if (extension != '') {
			if (name != '') {
				name += ' ';
			}
			name += extension;
		} 

		// add 'file item'
		//
		if (name != '') {
			name += ' ';
		}
		name += 'file item';

		// add preview tag
		//
		if (this.model.hasThumbnail()) {
			if (name != '') {
				name += ' ';
			}
			name += 'preview';
		}

		return name;
	},

	//
	// querying methods
	//

	hasThumbnail: function() {
		return (!this.options.preferences || this.options.preferences.get('show_thumbnails')) && this.model.hasThumbnail();
	},

	canShowThumbnail: function() {
		let size = this.get('size');
		if (size != undefined) {
			let maxSize = config.apps.file_browser.max_thumbnail_file_size;
			
			if (this.model.getFileExtension() == 'svg') {
				let maxSvgSize = config.apps.file_browser.max_thumbnail_svg_file_size;
				if (size > maxSvgSize) {
					return false;
				}
			}

			return size < maxSize;
		}
	},

	//
	// getting methods
	//

	getName: function() {
		if (this.options.preferences && this.options.preferences.get('show_file_extensions')) {
			return this.model.getName();
		} else {
			return this.model.getBaseName();
		}
	},

	getThumbnailUrl: function() {
		return this.model.getThumbnailUrl({
			max_size: Math.floor(this.thumbnailSize * (window.devicePixelRatio || 1))
		});
	},
	
	getThumbnail: function() {
		if (this.model.getFileExtension().toLowerCase() == 'svg') {
			return '<img class="thumbnail svg" src="' + this.model.getUrl() + '" />';
		} else if (this.model.has('resolution')) {
			let resolution = this.model.get('resolution');
			let width = resolution[0] < resolution[1]? resolution[0] / resolution[1] * this.thumbnailSize : this.thumbnailSize;
			let height = resolution[1] < resolution[0]? resolution[1] / resolution[0] * this.thumbnailSize : this.thumbnailSize;			
			return '<img class="thumbnail photo" src="' + this.getThumbnailUrl() + 
				'" style="width:' + width + 'px; height:' + height + 'px" />';
		} else {
			return '<img class="thumbnail photo" src="' + this.getThumbnailUrl() + '" />';			
		}
	},

	getIconName: function() {
		let name = this.model.getName().toLowerCase();

		if (config.files.files.names[name]) {

			// get icon by file name
			//
			return config.files.files.names[name].icon;
		} else {

			// get icon by file extension
			//
			let extension = this.model.getFileExtension().toLowerCase();

			// get icon
			//
			if (config.files.files.extensions[extension]) {
				return config.files.files.extensions[extension].icon;
			} else {
				return config.files.files.icon;
			}
		}
	},

	getIconUrl: function() {
		return config.servers.images + '/' + this.constructor.getIconPath() + '/' + this.getIconName();
	},

	getIconId: function() {
		let name = this.model.getName().toLowerCase();

		if (config.files.files.names[name]) {

			// get id by file name
			//
			return name + '-file-icon';
		} else {

			// get id by file extension
			//
			let extension = this.model.getFileExtension().toLowerCase();
			return extension + '-file-icon';
		}
	},

	//
	// setting methods
	//

	setName: function(name) {

		// append extension if hiding extensions
		//
		if (!this.options.preferences.get('show_file_extensions')) {
			let extension = this.model.getFileExtension();
			if (extension) {
				name = name + '.' + extension;
			}
		}

		ItemIconView.prototype.setName.call(this, name);
	}
}, {
	
	//
	// static methods
	//

	getIconPath: function() {
		return 'icons/files' + (application.isBinaryTheme()? '-binary' : '');
	}
});