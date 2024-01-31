/******************************************************************************\
|                                                                              |
|                             file-downloadable.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a file system behavior for downloading items.            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import File from '../../../../../models/files/file.js';
import Browser from '../../../../../utilities/web/browser.js';

export default {

	//
	// downloading methods
	//

	downloadItem: function(item) {

		// make sure that item is a file
		//
		if (!(item instanceof File)) {
			return;
		}

		// check file permissions
		//
		if (item.isReadableBy(application.session.user)) {

			// download item
			//
			item.download();
		} else {

			// show error message
			//
			application.alert({
				icon: '<i class="fa fa-lock"></i>',
				title: "Permissions Error",
				message: "You do not have permission to download this item!"
			});
		}
	},

	downloadItems: function(items) {
		let urls = [];
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			if (item.isReadableBy(application.session.user)) {
				urls.push(item.getDownloadUrl());
			} else {

				// show error message
				//
				application.alert({
					icon: '<i class="fa fa-lock"></i>',
					title: "Permissions Error",
					message: "You do not have permission to download this item!"
				});
			}
		}

		Browser.downloadAll(urls);
	},

	download: function(items) {			
		if (!Array.isArray(items)) {

			// download single item
			//
			this.downloadItem(items);
		} else if (items.length > 0) {

			// download multiple items
			//
			this.downloadItems(items);
		} else {

			// show alert dialog
			//
			application.alert({
				icon: '<i class="fa fa-mouse-pointer"></i>',
				title: "Select",
				message: "No items selected."
			});
		}
	}
};