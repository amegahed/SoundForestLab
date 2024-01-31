/******************************************************************************\
|                                                                              |
|                              directory-card-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a directory card (icon, name, and details).    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ItemCardView from '../../../../../../views/apps/file-browser/mainbar/files/cards/item-card-view.js';
import FileDroppable from '../../../../../../views/apps/file-browser/mainbar/behaviors/file-droppable.js';
import FileUtils from '../../../../../../utilities/files/file-utils.js';

export default ItemCardView.extend(_.extend({}, FileDroppable, {

	//
	// attributes
	//

	attributes: {
		'data-drop-effect': 'move'
	},

	events: _.extend({}, ItemCardView.prototype.events, FileDroppable.events),

	//
	// attribute methods
	//

	className: function() {
		let name = '';

		switch (this.get('path')) {
			case '/':
				name = 'home';
				break;
			case '.Clipboard/':
				name = 'clipboard';
				break;
			case 'Trash/':
				name = 'trash';
				break;
		}

		// add 'system'
		//
		if (this.isHidden()) {
			if (name != '') {
				name += ' ';
			}
			name += 'system';
		}

		// add 'directory item'
		//
		if (name != '') {
			name += ' ';
		}
		name += 'directory item';

		return name;
	},

	//
	// getting methods
	//

	getName: function() {
		return this.model.getName() || 'Home';
	},

	getIconName: function() {
		let name = this.model.getName().toTitleCase();
		let icons = config.files.folders.names[name];

		if (icons) {

			// use for custom icon
			//
			if (typeof icons.icon == 'string') {
				return icons.icon;
			} else {

				// select empty or full icon
				//
				if (this.model.isEmpty()) {
					return icons.icon[0];
				} else {
					return icons.icon[1];
				}
			}
		} else {

			// use standard icons
			//
			if (this.model.isEmpty()) {
				return config.files.folders.icon[0];
			} else if (this.model.isAudioAlbum()) {
				return config.files.folders.albums.audio.icon;
			} else if (this.model.isImageAlbum()) {
				return config.files.folders.albums.image.icon;
			} else if (this.model.isVideoAlbum()) {
				return config.files.folders.albums.video.icon;	
			} else {
				return config.files.folders.icon[1];
			}
		}
	},

	getIconUrl: function() {
		return config.servers.images + '/' + this.constructor.getIconPath() + '/' + this.getIconName();
	},

	getIconId: function() {
		let name = this.model.getName().toTitleCase();
		let icons = config.files.folders.names[name];
		
		if (icons) {

			// use for custom icon
			//
			let icon;
			if (typeof icons.icon == 'string') {
				icon = icons.icon;
			} else {

				// select empty or full icon
				//
				if (this.model.isEmpty()) {
					icon = icons.icon[0];
				} else {
					icon = icons.icon[1];
				}
			}

			let extension = FileUtils.getFileExtension(icon);
			return icon.replace('.' + extension, '-icon');
		} else {

			// use standard icons
			//
			if (this.model.isEmpty()) {
				return 'folder-empty-icon';
			} else if (this.model.isAudioAlbum()) {
				return 'audio-album-icon';
			} else if (this.model.isImageAlbum()) {
				return 'image-album-icon';
			} else if (this.model.isVideoAlbum()) {
				return 'video-album-icon';	
			} else {
				return 'folder-full-icon';
			}
		}			
	},

	//
	// drag and drop event handling methods
	//

	onDropOn: function(items) {

		// handle parent's drop on child callback
		//
		if (this.hasParentView('items') && this.getParentView('items').onDropOnChild) {
			this.getParentView('items').onDropOnChild(items, this, {

				// callbacks
				//
				success: () => this.unhighlight()
			});
		} else {
			this.unhighlight();
		}
	}
}), {

	//
	// static methods
	//

	getIconPath: function() {
		return 'icons/folders' + (application.isBinaryTheme()? '-binary' : '');
	}
});