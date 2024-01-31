/******************************************************************************\
|                                                                              |
|                              header-bar-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used to display an app's header bar.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import HeaderBarView from '../../../../views/apps/common/header-bar/header-bar-view.js';
import MenuBarView from '../../../../views/apps/audio-player/header-bar/menu-bar/menu-bar-view.js';
import TrackBarView from '../../../../views/apps/audio-player/header-bar/track-bar/track-bar-view.js';
import VolumeBarView from '../../../../views/apps/audio-player/header-bar/volume-bar/volume-bar-view.js';
import AudioBarView from '../../../../views/apps/audio-player/header-bar/audio-bar/audio-bar-view.js';
import Browser from '../../../../utilities/web/browser.js';

export default HeaderBarView.extend({

	//
	// attributes
	//

	toolbars: ['menu', 'track', 'volume', 'audio'],

	//
	// rendering methods
	//

	showToolbar: function(kind) {
		switch (kind) {
			case 'menu':
				this.showMenuBar();
				break;
			case 'track':
				this.showTrackBar();
				break;
			case 'volume':
				this.showVolumeBar();
				break;
			case 'audio':
				this.showAudioBar();
				break;
		}
	},

	showMenuBar: function() {
		this.showChildView('menu', new MenuBarView());
	},

	showTrackBar: function() {
		this.showChildView('track', new TrackBarView({

			// options
			//
			length: this.app.model? this.app.model.getLength() : undefined,
			progress: this.app.options.progress,
			repeatable: true,

			// callbacks
			//
			onplay: () => this.app.onPlay(),
			onpause: () => this.app.onPause(),
			onresume: () => this.app.onResume(),
			onchange: (time) => this.app.onScrub(time),
			onended: () => this.app.onEnded()
		}));
	},

	showVolumeBar: function() {

		// do not show volume control for mobile
		//
		if (Browser.is_mobile) {
			return;
		}

		this.showChildView('volume', new VolumeBarView({
			volume: this.app.preferences.get('volume'),

			// callbacks
			//
			onchange: (volume) => this.app.onChangeVolume(volume)
		}));
	},

	showAudioBar: function() {
		this.showChildView('audio', new AudioBarView());
		this.getChildView('audio').$el.addClass('desktop-app-only');
	}
});