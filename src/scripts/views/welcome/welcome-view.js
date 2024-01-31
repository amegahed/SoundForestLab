/******************************************************************************\
|                                                                              |
|                                  welcome-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the initial welcome view of the application.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ImageFile from '../../models/files/image-file.js';
import VideoFile from '../../models/files/video-file.js';
import Directory from '../../models/files/directory.js';
import UserPreferences from '../../models/preferences/user-preferences.js';
import BaseView from '../../views/base-view.js';
import CrawlerView from '../../views/welcome/crawler-view.js';
import Browser from '../../utilities/web/browser.js';

export default BaseView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="masthead">
			<div class="carousel">

				<div class="carousel-cell">
					<div class="background"></div>
					<div class="full-size overlay"></div>
				
					<div class="splash">
						<svg class="defs">
							<defs>
								<%= filters %>
							</defs>
						</svg>
				
						<% if (branding.welcome.splash.brand.logo) { %>
						<div class="logo">
							<% if (branding.welcome.splash.brand.logo.href) { %><a href="<%= branding.welcome.splash.brand.logo.href %>"><% } %><img src="<%= branding.welcome.splash.brand.logo.src %>"<% if (branding.welcome.splash.brand.logo.tooltip) { %> data-toggle="tooltip" title="<%= branding.welcome.splash.brand.logo.tooltip %>"<% } %> /><% if (branding.welcome.splash.brand.logo.href) { %></a><% } %>
						</div>
						<% } %>
						
						<% if (branding.welcome.splash.greeting && branding.welcome.splash.greeting.text) { %>
						<div class="greeting"><%= branding.welcome.splash.greeting.text %></div>
						<% } %>
				
						<% if (branding.welcome.splash.brand.logotype) { %>
						<% if (branding.welcome.splash.brand.logotype.href) { %><a href="<%= branding.welcome.splash.brand.logotype.href %>"><% } %>
						<div class="brand">
							<% let spans = ['prefix', 'first', 'middle', 'last', 'suffix']; %>
							<% for (let i = 0; i < spans.length; i++) { %><% let span = spans[i]; %><% if (branding.welcome.splash.brand.logotype[span]) { %><span class="<%= span %>"><% if (branding.welcome.splash.brand.logotype[span].text) { %><%= branding.welcome.splash.brand.logotype[span].text.replace(' ', '&nbsp') %><% } %></span><% } %><% } %>
						</div>
						<% if (branding.welcome.splash.brand.logotype.href) { %></a><% } %>
						<% } %>
				
						<% if (branding.welcome.splash.tagline && branding.welcome.splash.tagline.text) { %>
						<div class="tagline"><%= branding.welcome.splash.tagline.text %></div>
						<% } %>
				
						<% if (branding.welcome.splash.description && branding.welcome.splash.description.text) { %>
						<div class="description"><%= branding.welcome.splash.description.text %></div>
						<% } %>
				
						<% if (branding.links) { %>
						<div class="links">
							<% for (let i=0; i < branding.links.length; i++) { %>
							<div class="link"<% if (branding.links[i].font && defaults.fonts[branding.links[i].font]) { %>style="font-family:<%= defaults.fonts[branding.links[i].font]['font-family'] %>"<% } %>>
								<% if (branding.links[i].image) { %>
								<a href="<%= branding.links[i].url %>"><img class="pixelated" src="<%= branding.links[i].image %>" /></a>
								<% } %>
								<a href="<%= branding.links[i].url %>"><%= branding.links[i].text %></a>
							</div>
							<% } %>
						</div>
						<% } %>
						
						<% if (config.defaults.search && !config.defaults.search.hidden) { %>
						<div class="search row">
							<div class="input-group">
								<div class="input-group-addon btn" data-toggle="tooltip" data-container="body" title="Search <%= application.name %> public community">
									<i class="active fa fa-newspaper"></i>
								</div>	
								<input type="text" class="form-control" placeholder="<%= config.defaults.search.placeholder || 'Search' %>">
								<div class="input-group-addon btn">
									<i class="active fa fa-search"></i>
								</div>			
							</div>
						</div>
						<% } %>
				
						<div class="buttons">
							<% if (show_video) { %>
							<button class="show-video btn btn-lg desktop-only">
								<i class="fa fa-video"></i>View Video
							</button>
							<% } %>
							<div class="visible-xs">
								<% if (show_sign_in) { %>
								<button class="sign-in btn btn-primary btn-lg">
									<i class="fa fa-chevron-right"></i>Sign In
								</button>
								<% } %>
								<% if (show_sign_up) { %>
								<button class="sign-up btn btn-lg">
									<i class="fa fa-pencil-alt"></i>Sign Up!
								</button>
								<% } %>
							</div>
						</div>
					</div>
				</div>

				<div class="carousel-cells"></div>
			</div>
		</div>
		<div class="details"></div>
	`),

	regions: {
		background: '.background',
		cells: {
			el: '.carousel-cells',
			replaceElement: true
		},
		details: {
			el: '.details',
			replaceElement: true 
		}
	},

	events: {
		'click .logo': 'onClickLogo',
		'click .show-video': 'onClickShowVideo',
		'click .sign-in': 'onClickSignIn',
		'click .sign-up': 'onClickSignUp',
		'click .search .btn': 'onClickSearch'
	},

	//
	// constructor
	//

	initialize: function() {

		// load required fonts
		//
		if (config.branding.welcome) {
			this.loadFonts(config.branding.welcome);
		}
		if (config.branding.links) {
			for (let i = 0; i < config.branding.links.length; i++) {
				if (config.branding.links[i].font) {
					application.loadFont(config.branding.links[i].font);
				}
			}
		}
	},

	loadFonts: function(welcome) {
		if (welcome.splash && welcome.splash.brand && welcome.splash.brand.logotype) {
			this.loadLogoTypeFonts(welcome.splash.brand.logotype);
		}
	},

	loadLogoTypeFonts: function(logotype) {
		if (logotype.font) {
			application.loadFont(logotype.font);
		}

		// load fonts for logotype components
		//
		if (logotype.prefix && logotype.prefix.font) {
			application.loadFont(logotype.prefix.font);
		}
		if (logotype.first && logotype.first.font) {
			application.loadFont(logotype.first.font);
		}
		if (logotype.middle && logotype.middle.font) {
			application.loadFont(logotype.middle.font);
		}
		if (logotype.last && logotype.last.font) {
			application.loadFont(logotype.last.font);
		}
		if (logotype.suffix && logotype.suffix.font) {
			application.loadFont(logotype.suffix.font);
		}
	},

	//
	// querying methods
	//

	isMultiline(logotype) {
		if (logotype) {
			return logotype.first && logotype.first.text.includes(' ') ||
				logotype.middle && logotype.middle.text.includes(' ') ||
				logotype.last && logotype.last.text.includes(' ');
		}
	},

	//
	// getting methods
	//

	getImageUrls: function(paths) {
		let urls = [];
		for (let i = 0; i < paths.length; i++) {
			urls.push(new ImageFile({
				path: paths[i]
			}).getUrl());
		}
		return urls;
	},

	getLogoTypeLength: function(logotype) {
		let length = 0;

		if (logotype.prefix && logotype.prefix.text) {
			length += logotype.prefix.text.length;
		}
		if (logotype.first && logotype.first.text) {
			length += logotype.first.text.length;
		}
		if (logotype.middle && logotype.middle.text) {
			length += logotype.middle.text.length;
		}
		if (logotype.last && logotype.last.text) {
			length += logotype.last.text.length;
		}
		if (logotype.suffix && logotype.suffix.text) {
			length += logotype.suffix.text.length;
		}

		return length;
	},

	//
	// setting methods
	//

	setBackgroundStyles: function(welcome) {
		if (welcome.background) {
			this.$el.find('.masthead').css('background', welcome.background);
		}
		if (welcome.background_color) {
			this.$el.find('.masthead').css('background-color', welcome.background_color);
		}
		if (welcome.background_image) {
			this.$el.find('.masthead').css('background-image', 'url("' + welcome.background_image + '")');
		}
		if (welcome.background_position) {
			this.$el.find('.masthead').css('background-position', welcome.background_position);
		}
		if (welcome.background_repeat) {
			this.$el.find('.masthead').css('background-repeat', welcome.background_repeat.replace('_', '-'));
		}
	},

	setSplashStyles: function(splash) {
		this.setSplashBackgroundStyles(splash);

		if (splash.width) {
			this.$el.find('.splash').css('min-width', splash.width);
		}
		if (splash.brand) {
			this.setSplashBrandStyles(splash.brand);
		}

		this.setTextElementStyles(this.$el.find('.splash .greeting'), splash.greeting);
		this.setTextElementStyles(this.$el.find('.splash .tagline'), splash.tagline);
		this.setTextElementStyles(this.$el.find('.splash .description'), splash.description);
	},

	setSplashBackgroundStyles: function(splash) {
		if (splash.background) {
			this.$el.find('.splash').css('background', splash.background);
		}
		if (splash.background_color) {
			this.$el.find('.splash').css('background-color', splash.background_color);
		}
		if (splash.background_image) {
			this.$el.find('.splash').css('background-image', 'url("' + splash.background_image + '")');
		}
	},

	setSplashBrandStyles: function(brand) {

		// set splash logo styles
		//
		if (brand.logo) {
			this.setLogoStyles(brand.logo);
			this.setLogoImageStyles(brand.logo);
		}

		// set splash logotype styles
		//
		if (brand.logotype) {
			this.setLogoTypeStyles(brand.logotype);
		}
	},

	setLogoStyles: function(logo) {
		if (logo.border == 'round') {
			this.$el.find('.splash .logo').addClass('round');
		}
		if (logo.border == 'rounded') {
			this.$el.find('.splash .logo').addClass('rounded');
		} 
		if (logo.sound) {
			this.$el.find('.splash .logo').addClass('active');
		}
		if (logo.class) {
			this.$el.find('.splash .logo').addClass(logo.class);
		}
		if (logo.size) {
			this.$el.find('.splash .logo').addClass(logo.size);
		}
	},

	setLogoImageStyles: function(logo) {
		if (logo.background) {
			this.$el.find('.splash .logo img').css({
				'background': logo.background
			});
		}
		if (logo['border-radius']) {
			this.$el.find('.splash .logo img').css({
				'border-radius': logo['border-radius']
			});
		}
		if (logo.outline) {
			this.$el.find('.splash .logo img').css({
				'outline': logo.outline
			});
		}
		if (logo.rendering) {
			this.$el.find('.splash .logo img').addClass(logo.rendering);
		}
	},

	setLogoTypeStyles: function(logotype) {
		if (this.getLogoTypeLength(logotype) > 12) {
			this.$el.find('.brand').addClass('long');
		}
		if (logotype.color) {
			this.$el.find('.brand').css({
				color: logotype.color
			});
		}

		// set font styles
		//
		if (logotype.font) {
			this.$el.find('.brand').css({
				'font-family': config.fonts[logotype.font]['font-family']
			});
		}
		if (logotype.font_variant) {
			this.$el.find('.brand').css('font-variant', logotype.font_variant);
		}
		if (logotype.font_size) {
			this.$el.find('.brand').css('font-size', logotype.font_size);
		}
		if (logotype.text_transform) {
			this.$el.find('.brand').css('text-transform', logotype.text_transform);
		}
		if (logotype.text_shadow) {
			this.$el.find('.brand').css('text-shadow', logotype.text_shadow);
		}

		// set logotype component styles
		//
		if (logotype.prefix) {
			this.setTextElementStyles(this.$el.find('.brand .prefix'), logotype.prefix);
		}
		if (logotype.first) {
			this.setTextElementStyles(this.$el.find('.brand .first'), logotype.first);
		}
		if (logotype.middle) {
			this.setTextElementStyles(this.$el.find('.brand .middle'), logotype.middle);
		}
		if (logotype.last) {
			this.setTextElementStyles(this.$el.find('.brand .last'), logotype.last);
		}
		if (logotype.suffix) {
			this.setTextElementStyles(this.$el.find('.brand .suffix'), logotype.suffix);
		}
	},

	setTextElementStyles: function(element, attributes) {
		if (!attributes) {
			return;
		}
		if (attributes.color) {
			$(element).css({
				color: attributes.color
			});
		}
		if (attributes.font && config.fonts[attributes.font]) {
			$(element).css({
				'font-family': config.fonts[attributes.font]['font-family']
			});
		}
		if (attributes.font_size) {
			$(element).css({
				'font-size': attributes.font_size
			});
		}
		if (attributes.font_style) {
			$(element).css({
				'font-style': attributes.font_style
			});
		}
		if (attributes.font_weight) {
			$(element).css({
				'font-weight': attributes.font_weight
			});
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			defaults: config.defaults,
			branding: config.branding,
			filters: this.options.filters,
			show_video: config.welcome && config.welcome.options.view_video && config.welcome.options.view_video.enabled,
			show_sign_in: application.session.has('config'),
			show_sign_up: application.session.has('config')? application.session.get('config').sign_up_enabled : false
		};
	},

	onRender: function() {

		// show dialogs
		//
		if (this.options.signIn) {
			application.signIn();
		} else if (this.options.signUp) {
			application.signUp();
		}

		// show child views
		//
		if (config.branding.welcome) {

			// set splash styles
			//
			if (config.branding.welcome.splash) {
				this.setSplashStyles(config.branding.welcome.splash);
			}

			// show crawler
			//
			if (config.branding.welcome.crawler) {
				this.showCrawler(config.branding.welcome.crawler);
			}

			// set styles
			//
			this.setBackgroundStyles(config.branding.welcome);

			// show splash carousel
			//
			window.setTimeout(() => {
				this.showSplashCarousel();
			}, 500);

			// show details
			//
			if (config.branding.welcome.details) {
				this.showDetails(config.branding.welcome.details, () => {
					this.onLoad();
				});
			} else {
				this.onLoad();
			}
		}

		if (config.branding.welcome.overlay) {
			this.showOverlay(config.branding.welcome.overlay);
		}

		// add tooltip triggers
		//
		this.addTooltips();
	},

	onAttach: function() {
		if (!config.branding.welcome.details) {
			this.$el.parent().addClass('full-size');
		}
	},

	showOverlay: function(overlay) {

		// add overlay colors
		//
		if (overlay.far_color && overlay.near_color) {
			this.$el.find('.overlay').css({
				background: 'linear-gradient(to bottom, ' +
					overlay.far_color + ' 0%, ' +
					overlay.near_color + ' 100%)'
			});
		} else if (overlay.background) {
			this.$el.find('.overlay').css({
				background: overlay.background
			});
		} else if (overlay.background_color) {
			this.$el.find('.overlay').css({
				'background-color': overlay.background_color
			});
		} else if (overlay.background_image) {
			this.$el.find('.overlay').css({
				'background-image': 'url("' + overlay.background_image + '")'
			});
		}
	},

	showDetails: function(address, done) {
		fetch(address).then((response) => response.text()).then((text) => {
			this.showChildView('details', new BaseView({
				className: 'details content',
				template: template(text)
			}));

			// init detail carousels
			//
			this.$el.find('.details .carousel').flickity({
				autoPlay: 1000, 
				wrapAround: true,
				pageDots: false,
				prevNextButtons: false,
				pauseAutoPlayOnHover: false
			});

			done();
		});
	},

	showCarouselCells: function(address, done) {
		fetch(address).then((response) => response.text()).then((text) => {

			// show carousel content
			//
			this.$el.find('.carousel-cells').replaceWith($(text));

			// apply carousel
			//
			this.$el.find('.masthead .carousel').flickity({
				wrapAround: true,
				pageDots: true,
				prevNextButtons: false,
				pauseAutoPlayOnHover: false
			});

			done();
		});
	},

	showSplashCarousel: function(done) {

		// show top masthead carousel
		//
		if (config.branding.welcome.carousel && Browser.device == 'desktop') {

			// temporarily remove scrollbars
			//
			this.$el.css('overflow', 'hidden');

			this.showCarouselCells(config.branding.welcome.carousel, () => {

				// restore scrollbars
				//
				this.$el.css('overflow', '');

				if (done) {
					done();
				}
			});
		} else {
			if (done) {
				done();
			}
		}
	},

	showCrawler: function(options) {
		if (typeof options.images == 'string') {

			// load list of images
			//
			new Directory({
				path: options.images
			}).load({

				// callbacks
				//
				success: (model) => {
					this.showChildView('background', new CrawlerView(_.extend(options, {
						images: this.getImageUrls(model.getPaths((path) => {
							return path.endsWith('png') || path.endsWith('.jpg');
						}))
					})));
				}
			});
		} else {
			this.showChildView('background', new CrawlerView(options));
		}
	},

	showVideo: function(path) {

		// load video file
		//
		new VideoFile({
			path: path
		}).fetch({

			success: (model) => {
				application.launch('video_player', {
					model: model,
					preferences: UserPreferences.create('video_player', {
						show_sidebar: false
					}),
					autoplay: true
				}, {
					maximized: true,
					full_screen: false
				});
			},

			error: () => {
				application.error({
					message: 'Video not found.'
				});
			}
		});
	},

	//
	// event handling methods
	//
	
	onLoad: function() {

		// add lightbox for details
		//
		this.parent.addLightBox();

		// call page onload
		//
		this.parent.onLoad();
	},

	//
	// mouse event handling methods
	//

	onClickLogo: function() {
		if (config.branding.welcome.splash.brand.logo.sound) {
			application.play(config.branding.welcome.splash.brand.logo.sound);
		}
	},

	onClickShowVideo: function() {
		this.showVideo(config.welcome.options.view_video.path);
	},

	onClickSignIn: function() {
		application.signIn();
	},

	onClickSignUp: function() {
		application.signUp();
	},

	onClickSearch: function() {
		let search = this.$el.find('.search input').val();
		if (search && search != '') {
			application.navigate('#search?query=' + encodeURIComponent(search), {
				trigger: true
			});
		}
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		if (event.keyCode == 13) {
			this.onClickSearch();
		}
	},

	//
	// window event handling methods
	//

	onResize: function() {

		// unify heights of carousel cells
		//
		let carouselCells = this.$el.find('.carousel-cell');
		let height = $(carouselCells[0]).height();
		for (let i = 1; i < carouselCells.length; i++) {
			$(carouselCells[i]).css('height', height);
		}
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {
		$(window).off("resize", this.onResize);
	}
});