/******************************************************************************\
|                                                                              |
|                          open-audio-dialog-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a dialog for opening audio files.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Directory from '../../../../../models/files/directory.js';
import AudioFile from '../../../../../models/files/audio-file.js';
import OpenItemsDialogView from '../../../../../views/apps/file-browser/dialogs/files/open-items-dialog-view.js';

export default OpenItemsDialogView.extend({

	//
	// attributes
	//

	title: "Open Audio File",

	//
	// filtering methods
	//

	filter: function (child) {

		// check if hidden
		//
		if (child.options.preferences) {
			if (!child.options.preferences.get('show_hidden_files') && child.model.isHidden()) {
				return false;
			}
		}

		// check if a directory
		//
		if (child.model instanceof Directory) {
			return true;
		}

		// check if valid file type
		//
		return child.model instanceof AudioFile;
	}
});
