/******************************************************************************\
|                                                                              |
|                           open-theme-dialog-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a dialog for opening theme files.                        |
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
import OpenItemsDialogView from '../../../../../views/apps/file-browser/dialogs/files/open-items-dialog-view.js';

export default OpenItemsDialogView.extend({

	//
	// attributes
	//

	title: "Open Theme",

	//
	// filtering methods
	//

	filter: function (child) {

		// check if hidden
		//
		if (child.options.preferences) {
			if (!child.options.preferences.get('show_hidden_files') && child.isHidden()) {
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
		let extensions = application.settings.associations.getFileExtensions('theme_manager');
		return extensions.contains(child.model.getFileExtension());
	}
});
