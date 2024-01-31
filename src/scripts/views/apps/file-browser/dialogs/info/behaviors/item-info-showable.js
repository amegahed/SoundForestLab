/******************************************************************************\
|                                                                              |
|                             item-info-showable.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for showing file item information.            |
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
import AudioFile from '../../../../../../models/files/audio-file.js';
import ImageFile from '../../../../../../models/files/image-file.js';
import VideoFile from '../../../../../../models/files/video-file.js';
import Directory from '../../../../../../models/files/directory.js';
import Volume from '../../../../../../models/files/volume.js';
import Items from '../../../../../../collections/files/items.js';
import FileInfoShowable from '../../../../../../views/apps/file-browser/dialogs/info/behaviors/file-info-showable.js';
import DirectoryInfoShowable from '../../../../../../views/apps/file-browser/dialogs/info/behaviors/directory-info-showable.js';

export default _.extend({}, FileInfoShowable, DirectoryInfoShowable, {

	//
	// dialog rendering methods
	//

	showItemsInfoDialog: function(items, options) {

		// show info for a single item
		//
		if (items.length == 1) {
			this.showItemInfoDialog(items[0], options);
			return;
		}

		// show info for multiple items
		//
		import(
			'../../../../../../views/apps/file-browser/dialogs/info/items-info-dialog-view.js'
		).then((ItemsInfoDialogView) => {

			// show items info dialog
			//
			this.show(new ItemsInfoDialogView.default(_.extend({
				collection: new Items(items)
			}, options)));				
		});
	},

	showItemInfoDialog: function(item, options) {
		if (item instanceof Volume) {
			this.showVolumeInfoDialog(item, options);
		} else if (item instanceof Directory) {
			this.showDirectoryInfoDialog(item, options);
		} else if (item instanceof AudioFile) {
			this.showAudioFileInfoDialog(item, options);
		} else if (item instanceof ImageFile) {
			this.showImageFileInfoDialog(item, options);
		} else if (item instanceof VideoFile) {
			this.showVideoFileInfoDialog(item, options);
		} else if (item instanceof File) {
			this.showFileInfoDialog(item, options);
		}
	}
});