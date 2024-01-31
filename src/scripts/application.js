/******************************************************************************\
|                                                                              |
|                                application.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the top level view of the application.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

// library imports
//
import '../library/underscore/underscore.js';
import '../library/jquery/jquery-3.6.0.js';
import '../library/backbone/backbone.js';
import '../library/backbone/marionette/backbone.marionette.js';

// vendor imports
//
import '../vendor/jquery/jquery-ui/js/jquery-ui.js';
import '../vendor/jquery/jquery-bridget/jquery-bridget.js';
import '../vendor/jquery/doubletap/jquery-doubletap.js';
import '../vendor/jquery/jquery-finger/jquery.finger.js';
import '../vendor/flickity/js/flickity.pkgd.js';

// module imports
//
import Router from './router.js';
import Session from './models/users/auth/session.js';
import App from './models/apps/app.js';
import Directory from './models/files/directory.js';
import FileAssociations from './models/settings/file-associations.js';
import SystemSettings from './models/settings/system-settings.js';
import DesktopSettings from './models/settings/desktop-settings.js';
import ThemeSettings from './models/settings/theme-settings.js';
import ControlSettings from './models/settings/control-settings.js';
import DialogSettings from './models/settings/dialog-settings.js';
import NotificationSettings from './models/settings/notification-settings.js';
import SoundSettings from './models/settings/sound-settings.js';
import Apps from './collections/apps/apps.js';
import AppLauchable from './behaviors/app-launchable.js';
import Authenticatable from './behaviors/authenticatable.js';
import Registerable from './behaviors/registerable.js';
import SoundPlayable from './behaviors/sound-playable.js';
import UserShowable from './behaviors/user-showable.js';
import ChatShowable from './behaviors/chat-showable.js';
import TopicShowable from './behaviors/topic-showable.js';
import PostShowable from './behaviors/post-showable.js';
import ProjectShowable from './behaviors/project-showable.js';
import FullScreenable from './views/behaviors/layout/full-screenable.js';
import AppLoadable from './views/apps/common/behaviors/loading/app-loadable.js';
import Openable from './views/apps/common/behaviors/launching/openable.js';
import Alertable from './views/dialogs/behaviors/alertable.js';
import MainView from './views/layout/main-view.js';
import PageView from './views/layout/page-view.js';
import ModalView from './views/dialogs/modal-view.js';
import Keyboard from './views/keyboard/keyboard.js';
import Browser from './utilities/web/browser.js';
import CssUtils from './utilities/web/css-utils.js';

export default Marionette.Application.extend(_.extend({}, AppLauchable, Authenticatable, Registerable, SoundPlayable, UserShowable, ChatShowable, TopicShowable, PostShowable, ProjectShowable, FullScreenable, AppLoadable, Openable, Alertable, {

	//
	// attributes
	//

	region: 'body',

	events: {

		// mouse events
		//
		'mousedown': 'onMouseDown',

		// keyboard events
		//
		'keydown:not([contenteditable="true"])': 'onKeyDown'
	},

	settings: {

		// system settings
		//
		system: new SystemSettings(),
		associations: new FileAssociations(),
		notifications: new NotificationSettings(),
		sound: new SoundSettings(),

		// theme settings
		//
		desktop: new DesktopSettings(),
		theme: new ThemeSettings(),
		controls: new ControlSettings(),
		dialogs: new DialogSettings()
	},
	
	defaults: config.defaults,

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		if (!options) {
			options = {};
		}
		this.options = options;
		this.apps = this.getApps();
		this.name = config.branding.name;

		// set web page title
		//
		if (config.branding.title) {
			document.title = config.branding.title;
		}

		// make Flickety a jquery plug-in
		//
		$.bridget('flickity', Flickity);

		// create new session
		//
		this.session = new Session({

			// callbacks
			//
			error: () => this.signIn()
		});

		// initialize keyboard state
		//
		this.keyboard = new Keyboard({
			el: this.$el
		});

		// listen for keyboard events
		//
		this.listenTo(this.keyboard, 'keydown', this.onKeyDown);

		// allow cross domain requests
		//
		$.support.cors = true;

		// ensure all session information is forwarded by default 
		// and watch for expired or fraudluent sessions
		//
		$.ajaxSetup({
			xhrFields: {
				withCredentials: true
			}
		});

		// set ajax calls to display wait cursor while pending
		//
		$(document).ajaxStart(() => {
			$('html').attr('style', 'cursor: wait !important;');
			// $(document).trigger($.Event('mousemove'));
		}).ajaxComplete(() => {
			$('html').removeAttr('style');
			// $(document).trigger($.Event('mousemove'));
		});

		// in the event of a javascript error, reset the pending ajax spinner
		//
		$(window).on('error', () => $.event.trigger('ajaxStop'));

		// play tap sound
		//
		if (Browser.is_mobile) {
			$(document).on('tap', () => this.play('tap'));
		}

		// disable pinch zoom on touch devices
		//
		if (Browser.is_touch_enabled) {
			document.addEventListener('touchmove', (event) => {
				if (event.scale !== 1) {
					event.preventDefault();
				}
			}, false);
		}
	
		// store handle to application
		//
		window.application = this;

		// create routers
		//
		this.router = new Router();

		// after any route change, clear modal dialogs
		//
		this.router.on("route", () => {
			this.getChildView('modals').closeNonMinimized();
		});

		// create sounds
		//
		this.createSounds(Object.keys(config.sounds));
	},

	//
	// querying methods
	//

	isSignedIn: function() {
		return this.session && this.session.user != undefined;
	},

	isUserSignedIn: function() {
		return this.isSignedIn() && !this.session.user.isAdmin();
	},

	isBinaryTheme: function() {
		return Browser.is_firefox && !($('body').hasClass('colored'));
	},

	hasDirectory: function(name) {

		// return home directory
		//
		if (!name) {
			return this.session.home;
		}

		// create path
		//
		let path;
		if (name.endsWith('/')) {
			path = name;
		} else {
			path = name + '/';
		}

		// find directory
		//
		return this.session.home && this.session.home.hasItem(path);
	},

	hasChildView: function(name) {
		return this.getView().hasChildView(name);
	},

	isEmbedded: function() {
		return Browser.isInIFrame() && window.location.hash.startsWith('#links');
	},

	isDesktopVisible: function() {
		if (Browser.is_mobile) {
			return false;
		}
		return this.desktop && this.getChildView('modals').isEmpty();
	},

	//
	// getting methods
	//

	getChildView: function(name) {
		return this.getView().getChildView(name);
	},

	getPageOrientation: function() {
		return $(window).width() > $(window).height()? 'landscape' : 'portrait';
	},
	
	getUrl: function() {
		if (config.base_url) {
			return config.base_url + '/';
		} else {
			let protocol = window.location.protocol,
				hostname = window.location.host,
				pathname = window.location.pathname;
			return protocol + '//' + hostname + pathname;
		}
	},

	getApp: function(appName) {
		return this.apps.findWhere({
			id: appName
		});
	},

	getApps: function(filter) {
		let collection = new Apps();
		let keys = Object.keys(config.apps);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];

			// create new app model from default data
			//
			let app = new App(_.extend(config.apps[key], {
				id: key,
				app: key.replace(/_/g, '-')
			}));

			// add to collection
			//
			if (!filter || filter(app)) {
				collection.add(app);
			}
		}
		return collection;
	},

	getDirectory: function(path) {
		
		// return home directory
		//
		if (!path) {
			if (!this.session.home) {
				this.session.home = new Directory();
			}
			return this.session.home;
		}

		// make sure path ends in slash
		//
		if (!path.endsWith('/')) {
			path = path + '/';
		}

		// find directory
		//
		if (this.session.home && this.session.home.hasItem(path)) {
			return this.session.home.getItem(path);
		}

		// create directory
		//
		return new Directory({
			path: path
		});
	},

	getActiveView: function() {

		// get focused modal
		//
		if (this.getChildView('modals').hasFocused()) {
			return this.getChildView('modals').getFocused();
		}

		// return application view
		//
		if (this.isEmbedded()) {
			return this.getView();
		}

		// get main active view
		//
		let activeView = this.getChildView('main');
		if (activeView && activeView.getActiveView) {
			activeView = activeView.getActiveView();
		}

		return activeView;
	},

	getModals: function() {
		if (this.isDesktopVisible()) {
			return this.desktop.getCurrentApp().modals;
		} else {
			return this.getChildView('modals');
		}
	},

	//
	// setting methods
	//

	setUser: function(user, done) {

		// set attributes
		//
		this.session.user = user;

		// update header
		//
		if (!this.isEmbedded()) {
			this.showHeader();
		}

		// load user application settings
		//
		if (user) {
			this.loadUserThemeSettings(user, () => {
				this.loadUserSettings(user, done);
			});
		}
	},

	//
	// loading methods
	//

	loadUserSettings: function(user, done) {

		// load system settings
		//
		this.settings.system.fetchByUser(user, {

			// callbacks
			//
			success: () => {

				// load notification settings
				//
				this.settings.notifications.fetchByUser(user, {

					// callbacks
					//
					success: () => {

						// load sound settings
						//
						this.settings.sound.fetchByUser(user, {

							// callbacks
							//
							success: () => {

								// load file associations
								//
								this.settings.associations.fetchByUser(user, {

									// callbacks
									//
									success: () => {

										// perform callback
										//
										if (done) {
											done();
										}
									},

									error: () => {
										this.error({
											message: "Could not load file associations."
										});						
									}
								});
							},

							error: () => {
								this.error({
									message: "Could not load sound settings."
								});				
							}
						});
					},

					error: () => {
						this.error({
							message: "Could not load notification settings."
						});				
					}
				});
			},

			error: () => {
				this.error({
					message: "Could not load system settings."
				});						
			}
		});	
	},

	loadUserThemeSettings: function(user, done) {

		// load theme settings
		//
		this.settings.theme.fetchByUser(user, {

			// callbacks
			//
			success: (model) => {
				model.apply();

				// load control settings
				//
				this.settings.controls.fetchByUser(user, {

					// callbacks
					//
					success: (model) => {
						model.apply();

						// load dialog settings
						//
						this.settings.dialogs.fetchByUser(user, {

							// callbacks
							//
							success: (model) => {
								model.apply();

								// perform callback
								//
								if (done) {
									done();
								}
							},

							error: () => {
								this.error({
									message: "Could not load dialog settings."
								});						
							}
						});
					},

					error: () => {
						this.error({
							message: "Could not load control settings."
						});						
					}
				});
			},

			error: () => {
				this.error({
					message: "Could not load theme settings."
				});						
			}
		});
	},

	//
	// startup methods
	//

	start: function(options) {

		// call superclass method
		//
		Marionette.Application.prototype.start.call(this, options);

		// check if we need to sign in
		//
		if (this.isEmbedded()) {
			this.startRouter();
		} else {

			// check to see if user is logged in
			//
			this.session.relogin({

				// callbacks
				//
				success: (model) => {

					// set current user
					//
					this.setUser(model);

					// start router
					//
					this.startRouter();
				},

				error: () => {
					this.startRouter();
				}
			});
		}
	},

	startRouter: function() {
		if (!Backbone.history.start({
			pushState: config.usePushState
		})) {
			this.router.showNotFound();
		}
	},

	reset: function() {

		// reset system settings
		//
		this.settings.system.reset();

		// reset theme settings
		//
		this.settings.theme.reset();
		this.settings.controls.reset();
		this.settings.desktop.reset();
		this.settings.dialogs.reset();

		// apply default theme settings
		//
		this.settings.theme.apply();
		this.settings.controls.apply();
		this.settings.desktop.apply();
		this.settings.dialogs.apply();

		// reset attributes
		//
		this.desktop = undefined;
		this.session.user = undefined;
	},

	//
	// rendering methods
	//

	onStart: function() {

		// show main view
		//
		this.showView(new MainView({
			keyboard: this.keyboard,
			showHeader: true
		}), {
			replaceElement: true
		});

		this.onRender();
	},

	onRender: function() {

		// set theme to match system color scheme preferences
		//
		if (this.isEmbedded()) {
			this.settings.theme.set('day_theme', Browser.color_scheme);
			this.settings.theme.set('night_theme', Browser.color_scheme);
		}

		// listen for changes to system color scheme preferences
		//
		Browser.onChangeColorScheme((colorScheme) => {
			this.settings.theme.set('day_theme', colorScheme);
			this.settings.theme.set('night_theme', colorScheme);
		});

		// set initial style
		//
		this.settings.theme.apply();
		this.settings.controls.apply();
		this.settings.dialogs.apply();

		// add helpful class for mobile OS'es
		//
		$('body').attr('device', Browser.device);
		if (Browser.device == 'phone' || Browser.device == 'tablet') {
			$('body').addClass('mobile');
		}

		// add helpful classes for browser detection
		//
		if (Browser.mobile_os) {
			$('body').attr('os', Browser.mobile_os.toLowerCase());
		}
		if (Browser.name) {
			$('body').attr('browser', Browser.name.toLowerCase());
		}
		if (Browser.os_type) {
			$('body').attr('os', Browser.os_type.toLowerCase());
		}

		// remove hover styles to avoid double tap on mobile
		//
		if (Browser.is_touch_enabled) {
			CssUtils.removeAllHoverStyles();
		}

		// listen for window resize
		//
		$(window).on('resize', (event) => {
			this.onResize(event);
		});
	},

	show: function(view, options) {
		if (view instanceof ModalView) {
			if (this.isDesktopVisible()) {

				// show view in desktop's modals
				//
				this.desktop.show(view, options);
			} else {

				// show view in global modals
				//
				this.showModal(view, options);
			}
		} else {

			// show page view
			//
			this.showMain(view, options);
		}

		return view;
	},

	showModal: function(view, options) {
		this.getChildView('modals').show(view, options);
	},

	showHeader: function() {
		if (!this.session.user) {
			this.getView().showHeader();
		} else {
			this.getView().showUserHeader(this.session.user);
		}
	},
	
	showMain: function(view, options) {

		// show page navigation
		//
		if (this.hasChildView('header')) {
			if (options && options.nav) {
				this.getChildView('header').setNav(options.nav);
			} else {
				this.getChildView('header').setNav();				
			}
		}

		// show view in main region
		//
		this.getView().showMain(view, options);

		// scroll to top
		//
		$('#main')[0].scrollTo(0, 0);
	},

	showPage: function(view, options) {
		application.desktop = null;
		
		// show page view
		//
		this.showMain(new PageView({
			className: options && options.nav? options.nav + ' page': 'page',
			contentsView: view,
			showFooter: options? options.showFooter : true,
			alignment: options? options.alignment : undefined,
			theme: options? options.theme : undefined
		}), options);
	},

	showProfilePhoto: function(imageFile) {
		this.getChildView('header').showProfilePhoto(imageFile);
	},

	setProfilePhoto: function(imageFile) {
		this.getChildView('header').setProfilePhoto(imageFile);
	},

	loadFont: function(font) {
		if (font && font != '' && config.fonts[font]) {
			let fontName = config.fonts[font]['font-family'];
			let fontUrl = config.fonts[font].url;
			if (fontUrl) {
				ThemeSettings.loadFont(fontName, fontUrl);
			}
		}
	},

	//
	// dialog rendering methods
	//

	activateDialog: function(appView, options) {

		// handle app's dialog
		//
		if (appView.dialog) {

			// unminimize dialog
			//
			if (appView.dialog.isMinimized()) {
				appView.dialog.unminimize();
			}

			// move dialog to top of stack
			//
			appView.dialog.toTop();

			// focus dialog
			//
			appView.dialog.focus();
		}

		// set app options
		//
		if (options) {
			appView.options = options;
		}

		// reset app
		//				
		if (appView.initialize) {
			appView.initialize(options);
			appView.onRender();
		}
	},

	//
	// browser showing methods
	//

	showUrl: function(url, options) {
		// if (url.startsWith(this.getUrl())) {
		if (this.isFullScreen()) {
			this.launch('web_browser', {
				url: url
			});
		} else {

			// open new window or tab
			//
			window.open(url, options);
		}
	},

	//
	// navigating methods
	//

	navigate: function(url, options) {

		// reset history
		//
		if (options && options.reset) {
			Backbone.history.fragment = null;
		}

		// navigate to route
		//
		this.router.navigate(url, options);
	},

	//
	// mouse event handling methods
	//

	onMouseDown: function() {

		// switch to non keyboard accessible mode
		//
		$('body').removeClass('keyboard-accessible');
		window.removeEventListener('mousedown', this);
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		let activeView = this.getActiveView();

		// check that control keys are not down
		//
		if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {

			// check return key
			//
			switch (event.keyCode) {

				// return key
				//
				case Keyboard.keyCodes.enter:

					// check that element is not editable
					//
					if (event.target.type != 'input' && event.target.type != 'textarea' && !event.target.isContentEditable) {
						let buttons = activeView.$el.find('.btn-primary:not(.nosubmit):visible:enabled');

						// trigger primary button
						//
						if (buttons.length > 0) {
							$(buttons[0]).trigger('click');

							// prevent further handling of event
							//
							event.preventDefault();
							event.stopPropagation();
							return;
						}
					}
					break;

				// tab key
				//
				case Keyboard.keyCodes.tab:
					if (!$('body').hasClass('keyboard-accessible')) {

						// switch to keyboard accessible mode
						//
						$('body').addClass('keyboard-accessible');
						window.addEventListener('mousedown', this.onMouseDown);
					}
					break;
			}
		}

		// let active view handle event
		//
		if (activeView && activeView.onKeyDown) {
			if (activeView.onKeyDown(event)) {
				return;
			}
		}

		// let desktop always handle meta arrow keys
		//
		if (Keyboard.arrowKeys.contains(event.keyCode) && event.metaKey) {
			if (activeView instanceof ModalView) {
				if (this.getChildView('main').onKeyDown(event)) {
					return;
				}
			}
			event.preventDefault();
		}
	},

	//
	// window event handling methods
	//

	onResize: function(event) {
		let view = this.getView();
		if (view && view.onResize) {
			view.onResize(event);
		}
	}
}));