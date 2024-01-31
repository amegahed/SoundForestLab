/******************************************************************************\
|                                                                              |
|                                launchable.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an app used for launching applications.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Apps from '../../../../../collections/apps/apps.js';
import Browser from '../../../../../utilities/web/browser.js';

export default {

	//
	// attributes
	//

	filters: {
		mobile: (item) => {
			return item.get('platform') != 'desktop';
		},
		non_mobile: (item) => {
			return item.get('platform') != 'mobile';
		},
		desktop: (item) => {
			return !item.get('hidden');
		},
		mobile_desktop: (item) => {
			return item.get('platform') != 'desktop' && item.get('app') != 'app-launcher';
		}
	},

	//
	// selection timeout
	//

	deselectDuration: 1000,

	//
	// getting methods
	//

	getApps: function(filter) {

		// set optional parameter defaults
		//
		if (!filter) {
			filter = (app) => {
				return !app.get('hidden');
			};
		}

		// filter apps
		//
		let apps = new Apps(application.apps.filter(filter));

		if (Browser.is_mobile) {

			// show non-desktop apps
			//
			if (!this.dialog) {
				return new Apps(apps.filter(this.filters.mobile_desktop));
			} else {
				return new Apps(apps.filter(this.filters.mobile));
			}
		} else {

			// show non-mobile apps
			//
			return new Apps(apps.filter(this.filters.non_mobile));
		}
	},

	//
	// opening methods
	//

	openLink: function(item) {

		// go to link
		//
		if (Browser.is_mobile) {
			application.navigate(item.model.get('link'), {
				trigger: true
			});
		} else {
			application.launch('web_browser', {
				url: item.model.get('link')
			});			
		}

		// deselect item
		//
		item.deselect();
	},

	openApp: function(item) {
		let app = item.model.get('app') || item.model.get('app_alias');
		let app_id = app.replace(/-/g, '_');
		let options = item.model.get('options') || {};

		// start loading spinner
		//
		item.startLoading();

		// launch application
		//
		application.launch(app_id, options, {

			// calllbacks
			//
			success: () => {

				// stop loading spinner
				//
				item.stopLoading();
			},

			error: () => {

				// stop loading spinner
				//
				item.stopLoading();		
			}
		});

		// deselect after a pause
		//
		window.setTimeout(() => {
			item.deselect();
		}, this.deselectDuration);
	},

	//
	// file event handling methods
	//

	onOpen: function(item) {
		if (this.options && this.options.onopen) {
			this.options.onopen(item);
		} else if (item && item.model) {
			if (item.model.has('link')) {
				this.openLink(item);
			} else {
				this.openApp(item);
			}
		}
	}
};