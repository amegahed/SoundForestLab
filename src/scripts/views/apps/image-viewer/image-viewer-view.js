/******************************************************************************\
|                                                                              |
|                             image-viewer-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an app used for viewing image files.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ImageFile from '../../../models/files/image-file.js';
import Directory from '../../../models/files/directory.js';
import Items from '../../../collections/files/items.js';
import AppSplitView from '../../../views/apps/common/app-split-view.js';
import ModelShareable from '../../../views/apps/common/behaviors/sharing/model-shareable.js';
import HeaderBarView from '../../../views/apps/image-viewer/header-bar/header-bar-view.js';
import SideBarView from '../../../views/apps/image-viewer/sidebar/sidebar-view.js';
import ImageSplitView from '../../../views/apps/image-viewer/mainbar/image-split-view.js';
import FooterBarView from '../../../views/apps/image-viewer/footer-bar/footer-bar-view.js';
import Browser from '../../../utilities/web/browser.js';

export default AppSplitView.extend(_.extend({}, ModelShareable, {

	//
	// attributes
	//
	
	name: 'image_viewer',
	
	//
	// constructor
	//

	initialize: function() {

		// call superclass constructor
		//
		AppSplitView.prototype.initialize.call(this);

		// set collection
		//
		if (this.collection) {
			this.collection = new Items(this.getImageFiles(this.collection.models));
		} else if (this.model && this.model.collection) {
			this.collection = new Items(this.getImageFiles(this.model.collection.models));
		} else if (this.model) {
			this.collection = new Items([this.model]);
		} else {
			this.collection = new Items();
		}

		// bind gesture event handlers
		//
		this.$el.on('gesturestart', (event) => {
			this.onGestureStart(event);
		});
		this.$el.on('gesturechange', (event) => {
			this.onGestureChange(event);
		});
		this.$el.on('gestureend', (event) => {
			this.onGestureEnd(event);
		});
	},

	//
	// attribute methods
	//

	title: function() {
		return this.model? this.model.getName() : config.apps[this.name].name;
	},
	
	//
	// querying methods
	//
	
	isCompatible: function(item) {
		return item instanceof ImageFile;
	},

	hasImage: function() {
		return !this.collection.isEmpty();
	},

	hasImages: function() {
		return this.collection.length > 1;
	},

	hasSelected: function() {
		if (this.hasChildView('sidebar')) {
			return this.getChildView('sidebar').hasSelected();
		}
	},

	hasImageView: function() {
		return this.hasChildView('mainbar mainbar');
	},

	//
	// counting methods
	//

	numImages: function() {
		return this.collection.length;
	},

	//
	// getting methods
	//

	getImageView: function() {
		return this.getChildView('mainbar mainbar');
	},

	getImageIndex: function(model) {
		return this.collection.indexOf(model) + 1;
	},

	getImageNumber: function(which, options) {
		if (this.collection) {
			switch (which) {
				case 'first':
					return 1;
				case 'prev': {
					let imageNumber = this.getImageNumber();
					if (imageNumber > 1) {
						return imageNumber - 1;
					} else if (options && options.wraparound) {
						return this.numImages();
					} else {
						return 1;
					}
				}
				case 'next': {
					let imageNumber = this.getImageNumber();
					if (imageNumber < this.numImages()) {
						return imageNumber + 1;
					} else if (options && options.wraparound) {
						return 1;
					} else {
						return this.numImages();
					}
				}
				case 'last':
					return this.numImages();
				default:
					return this.getImageIndex(this.model);
			}
		}
	},

	getZoom: function(zoomMode) {
		return this.getImageView().getZoom(zoomMode);
	},

	getZoomMode: function() {
		return this.getChildView('header zoom_mode').getValue();
	},

	getRotation: function() {
		return this.getChildView('header rotate').rotation;
	},

	getHomeDirectory: function() {
		if (application.isSignedIn()) {

			// use directory from preferences
			//
			return application.getDirectory(this.preferences.get('home_directory'));
		} else if (this.model && this.model.parent) {

			// use directory from current file
			//
			return this.model.parent;
		} else {

			// use home directory
			//
			return application.getDirectory();
		}
	},

	getSelected: function() {
		return this.getChildView('sidebar').getSelected();
	},

	getSelectedModels: function() {
		return this.getChildView('sidebar').getSelectedModels();
	},

	getImageFiles: function(items) {
		if (items) {
			return new Items(items).filter((model) => {
				return model instanceof ImageFile;
			});
		} else {
			return [];
		}
	},

	getStatusBarView: function() {
		return FooterBarView.prototype.getStatusBarView();
	},

	//
	// setting methods
	//

	setModel: function(model) {

		// call superclass method
		//
		AppSplitView.prototype.setModel.call(this, model);

		// set collection of model
		//
		if (!this.collection) {
			this.setCollection(model? model.collection : null);
		}

		// set selected item in sidebar
		//
		this.setSelected(this.model);
	},

	setImageFiles: function(items) {

		// set collection to video files
		//
		this.collection.reset(this.getImageFiles(items));

		// update footer info
		//
		if (this.hasChildView('info')) {
			this.getChildView('info').update();
		}
	},

	setCollection: function(collection) {
		this.setImageFiles(collection.models);
	},

	setImageNumber: function(imageNumber, options) {

		// clamp to range
		//
		if (imageNumber < 1) {
			imageNumber = 1;
		}
		if (imageNumber > this.collection.length) {
			imageNumber = this.collection.length;
		}

		// load image
		//
		if (this.collection) {
			this.loadFile(this.collection.at(imageNumber - 1), options);
		}
	},

	setSelected: function(model) {
		if (this.hasChildView('sidebar')) {
		
			// select sidebar item
			//
			let sidebar = this.getChildView('sidebar');
			sidebar.setSelected(model, {
				silent: true
			});
		}
	},

	setZoom: function(zoom) {
		this.getChildView('header zoom').setZoom(zoom);
	},

	//
	// selecting methods
	//

	select: function(which) {
		this.setImageNumber(this.getImageNumber(which, {
			wraparound: true
		}));
	},

	//
	// file methods
	//

	openFile: function(file, options) {

		// set attributes
		//
		this.collection = options && options.collection? options.collection : new Items([file]);

		// update sidebar
		//
		if (this.hasChildView('sidebar')) {
			this.getChildView('sidebar').collection = this.collection;
			this.getChildView('sidebar').update();
		}

		// load item
		//
		this.loadFile(file);
	},

	openFiles: function(files) {

		// set attributes
		//
		this.collection = new Items(files);

		// update sidebar
		//
		if (this.hasChildView('sidebar')) {
			this.getChildView('sidebar').collection = this.collection;
			this.getChildView('sidebar').render();
		}

		// load first item
		//
		this.loadFile(this.collection.at(0));
	},

	openDirectory: function(directory) {
		if (directory.loaded) {
			this.openItems(directory.contents.models);
		} else {
			directory.load({

				// callbacks
				//
				success: () => {
					this.openItems(directory.contents.models);
				}
			});
		}
	},

	//
	// item opening methods
	//

	open: function(items) {
		if (items.length == 1) {
			this.openItem(items[0]);
		} else {
			this.openItems(items);
		}
	},

	openItem: function(item, options) {

		// clear current item
		//
		this.model = null;

		// open directory or file
		//
		if (item instanceof Directory) {
			this.openDirectory(item, options);
		} else if (item instanceof ImageFile) {
			this.openFile(item, options);
		}
	},

	openItems: function(items, options) {
		if (items.length == 1) {

			// open first item
			//
			this.openItem(items[0], options);
		} else {

			// open image files
			//
			this.openFiles(new Items(items).filter((model) => {
				return model instanceof ImageFile;
			}), options);
		}
	},

	//
	// loading methods
	//

	loadFile: function(model, options) {

		// close sidebar
		//
		if (Browser.device == 'phone') {
			this.getChildView('contents').closeSideBar();
		}
		
		// remove any previous help message
		//
		this.hideMessage();

		// set attributes
		//
		this.setModel(model);

		// show split view
		//
		if (!this.getChildView('contents').hasChildView('sidebar')) {
			if (this.preferences.get('show_sidebar')) {
				this.getChildView('contents').showSideBar();
			}
		}

		// update image
		//
		this.getImageView().loadFile(model, options);
		this.getChildView('content').getChildView('sidebar').setModel(model);
		
		// update sidebar
		//
		if (this.hasChildView('sidebar')) {
			this.getChildView('sidebar').setModel(model);
		}
	},

	downloadFile: function() {

		// download current image file
		//
		this.model.download();
	},

	//
	// slide show methods
	//

	play: function() {
		this.is_playing = true;

		// check if already playing
		//
		if (this.timeout) {
			return;
		}

		// update header bar
		//
		this.getChildView('header menu view').setItemSelected('view-slide-show', true);

		// update footer bar
		//
		if (this.hasChildView('footer-bar')) {
			this.getChildView('footer-bar nav-bar play').select({
				silent: true
			});
		}

		// start slide show
		//
		this.scheduleNext();
	},

	nextSlide: function() {
		let imageNumber = this.getImageNumber();
		let numImages = this.numImages();
		let next = (imageNumber % numImages) + 1;

		this.setImageNumber(next, {

			// callbacks
			//
			success: () => {
				let wraparound = (imageNumber == numImages);

				// check for wraparound
				//
				if (wraparound && !this.preferences.get('slide_looping')) {
					this.pause();
				} else if (this.is_playing) {
					this.scheduleNext();
				}
			}
		});
	},

	scheduleNext: function() {
		let duration = this.preferences.get('slide_duration');

		// advance after a short delay
		//
		this.setTimeout(() => {
			this.nextSlide();
		}, duration * 1000);
	},

	pause: function() {
		this.is_playing = false;

		// stop slide animation
		//
		this.stopSlideShow();

		// update header bar
		//
		this.getChildView('header menu view').setItemSelected('view-slide-show', false);

		// update footer bar
		//
		if (this.hasChildView('footer-bar')) {
			this.getChildView('footer-bar nav-bar play').deselect({
				silent: true
			});
		}
	},

	toggleSlideShow: function() {
		if (this.is_playing) {
			this.pause();
		} else {
			this.play();
		}
	},

	stopSlideShow: function() {
		this.clearTimeout();
	},

	//
	// rotating methods
	//

	setRotation: function(rotation) {
		this.getImageView().setRotation(rotation);
	},

	rotateTo: function(rotation, options) {
		let start = this.getRotation();
		let finish = rotation;
		let delta = finish - start;

		// animate zoom
		//
		if (delta != 0) {
			this.animation = $({t: 0}).animate({t: 1}, {
				duration: this.preferences? this.preferences.get('rotate_duration') : 0,

				// callbacks
				//
				step: (t) => {

					// interpolate rotation
					//
					this.setRotation(start + delta * t);
				},

				complete: () => {
					this.animation = null;
					this.getChildView('header rotate').rotation = rotation;

					// perform callback
					//
					if (options && options.finish) {
						options.finish();
					}
				}
			});
		}
	},

	//
	// rendering methods
	//

	onRender: function() {
		
		// call superclass method
		//
		AppSplitView.prototype.onRender.call(this);

		// show initial help message
		//
		if (!this.model) {
			this.showMessage("No images. Click to open.", {
				icon: '<i class="far fa-file-image"></i>',

				// callbacks
				//
				onclick: () => this.showOpenDialog()
			});

			// activate menus
			//
			this.getChildView('header menu').onLoad();
		}

		// add tooltip triggers
		//
		this.addTooltips();
	},

	update: function() {

		// set zoom
		//
		let zoom = this.parent.getZoom();
		if (zoom) {
			this.getChildView('header zoom').setZoom(Math.round(zoom));
		}
	},

	//
	// header bar rendering methods
	//

	getHeaderBarView: function() {
		return new HeaderBarView();
	},

	//
	// contents rendering methods
	//

	getSideBarView: function() {
		return new SideBarView({
			model: this.model,
			collection: this.collection,

			// options
			//
			panels: this.preferences.get('sidebar_panels'),
			view_kind: this.preferences.get('sidebar_view_kind'),
			tile_size: this.preferences.get('sidebar_tile_size')
		});
	},

	getContentView: function() {
		return new ImageSplitView({
			model: this.model,

			// options
			//
			preferences: this.preferences,
			show_sidebar: this.preferences.get('show_image_info'),
			sidebar_size: this.preferences.get('info_bar_size'),

			// callbacks
			//
			onload: (image) => this.onLoad(image),
			onerror: (message) => this.showMessage(message, {
				icon: '<i class="fa fa-bug"></i>'
			})
		});
	},
	
	//
	// footer bar rendering methods
	//

	getFooterBarView: function() {
		return new FooterBarView();
	},

	//
	// dialog rendering methods
	//

	showOpenDialog: function() {
		import(
			'../../../views/apps/image-viewer/dialogs/images/open-images-dialog-view.js'
		).then((OpenImagesDialogView) => {
			
			// show open images dialog
			//
			this.show(new OpenImagesDialogView.default({

				// start with home directory
				//
				model: this.getHomeDirectory(),

				// callbacks
				//
				onopen: (items) => {
					if (items) {
						this.openItems(items);
					}
				}
			}));
		});
	},
	
	showInfoDialog: function(options) {
		import(
			'../../../views/apps/file-browser/dialogs/info/image-file-info-dialog-view.js'
		).then((ImageFileInfoDialogView) => {

			// show image file info dialog
			//
			this.show(new ImageFileInfoDialogView.default(_.extend({
				model: this.model
			}, options)));				
		});	
	},

	showPreferencesDialog: function() {
		import(
			'../../../views/apps/image-viewer/dialogs/preferences/preferences-dialog-view.js'
		).then((PreferencesDialogView) => {

			// show preferences dialog
			//
			this.show(new PreferencesDialogView.default({
				model: this.preferences
			}));
		});
	},

	//
	// event handling methods
	//

	onChange: function() {
		this.getChildView('header zoom').onChange();
	},

	onLoad: function(image) {
		let width = image.naturalWidth;
		let height = image.naturalHeight;
		this.model.set('dimensions', [width, height], {
			silent: true
		});

		// check if view still exists
		//
		if (this.isDestroyed()) {
			return;
		}

		// start slide show
		//
		if (this.options.slide_show) {
			this.getChildView('footer nav').play();
			this.options.slide_show = false;
		}

		// handle child views
		//
		if (this.hasChildView('header') && this.getChildView('header').onLoad) {
			this.getChildView('header').onLoad();
		}
		if (this.hasChildView('footer') && this.getChildView('footer').onLoad) {
			this.getChildView('footer').onLoad();
		}

		// clear status message, if shown
		//
		this.hideMessage();

		// perform callback
		//
		if (this.options.onload) {
			this.options.onload();
		}
	},

	//
	// mouse event handling methods
	//

	onClick: function() {
		if (this.dialog && this.dialog.isFullScreen()) {
			if (this.hasChildView('footer nav')) {
				this.getChildView('footer nav').nextSlide();
			}
		}
	},

	//
	// touch event handling methods
	//

	onGestureStart: function() {
		this.zoomStart = this.getChildView('header zoom').getZoom(); 
	},

	onGestureChange: function(event) {
		this.getChildView('header zoom').setZoom(this.zoomStart * event.originalEvent.scale);

		// block event from parent
		//
		this.block(event);
	},

	onGestureEnd: function() {
		this.zoomStart = undefined;
	},

	//
	// window event handling methods
	//

	onResize: function(event) {

		// resize content
		//
		if (this.hasChildView('content')) {
			this.getImageView().onResize(event);
		}

		// update header
		//
		if (this.hasChildView('header zoom')) {
			let zoomMode = this.getZoomMode();
			if (zoomMode && zoomMode != 'actual_size') {

				// update current zoom
				//
				if (this.hasChildView('header zoom zoom_amount')) {
					let zoom = this.getImageView().getZoom(zoomMode);
					this.getChildView('header zoom zoom_amount').setValue(Math.round(zoom));
				}		
			}
		}
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {
		if (this.animation) {
			this.animation.stop();
		}
	}
}));