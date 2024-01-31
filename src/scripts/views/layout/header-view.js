/******************************************************************************\
|                                                                              |
|                                 header-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the application header and associated content.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import '../../../vendor/bootstrap/js/collapse.js';
import BaseView from '../../views/base-view.js';
import Browser from '../../utilities/web/browser.js';

export default BaseView.extend({

	//
	// attributes
	//

	id: 'header',

	template: template(`
		<div class="navbar navbar-fixed-top navbar-inverse">
			<div class="collapse navbar-collapse">
		
				<div class="navbar-brand">
					<div class="active brand">
						<% if (branding.header.brand.logo) { %>
						<img class="logo" src="<%= branding.header.brand.logo.src %>" />
						<% } %>
		
						<% if (branding.header.brand.logotype) { %>
						<div class="logotype">
							<% let spans = ['prefix', 'first', 'middle', 'last', 'suffix']; %>
							<% for (let i = 0; i < spans.length; i++) { %><% let span = spans[i]; %><% if (branding.header.brand.logotype[span] && branding.header.brand.logotype[span].text) { %><span class="<%= span %>"><%= branding.header.brand.logotype[span].text.replace(' ', '&nbsp') %></span><% } %><% } %>
						</div>
						<% } %>
					</div>
				</div>
		
				<!-- standard navbar -->
				<% if (branding.header.nav) { %>
				<ul class="nav heading navbar-nav">
					<% let navs = Object.keys(branding.header.nav) %>
					<% for (let i = 0; i < navs.length; i++) { %>
					<% let nav_name = navs[i]; %>
					<% let nav_item = branding.header.nav[nav_name]; %>
					<% let className = ''; %>
					<% if (nav == nav_name) { %>
					<% className += " active"; %>
					<% } %>
					<% if (nav_item.platform) { %>
					<% className += " " + nav_item.platform; %>
					<% } %>
					<li<% if (className != '') {%> class="<%= className %>" <% } %>><a class="<%= nav_name %>" href="<%= nav_item.href %>"><i class="<%= nav_item.icon %>"></i><label><%= nav_item.text %></label></a></li>
					<% } %>
				</ul>
				<% } %>
		
				<ul class="navbar-nav navbar-right hidden-xs">		
					<div class="navbar-form">
						<div class="buttons">
							<% if (show_sign_in) { %>
							<button class="sign-in btn btn-lg btn-primary">
								<i class="fa fa-sign-in-alt"></i>Sign In
							</button>
							<% } %>
							
							<% if (show_sign_up) { %>
							<button class="sign-up btn btn-lg">
								<i class="fa fa-pencil-alt"></i>Sign Up
							</button>
							<% } %>
						</div>
					</div>
				</ul>
			</div>
		</div>
	`),

	events: {
		'click .brand': 'onClickBrand',
		'click .sign-in': 'onClickSignIn',
		'click .sign-up': 'onClickSignUp',
	},

	//
	// constructor
	//

	initialize: function() {

		// load required fonts
		//
		if (config.branding.header.brand && config.branding.header.brand.logotype) {
			this.loadFonts(config.branding.header.brand.logotype);
		}
	},

	loadFonts: function(logotype) {
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
	// setting methods
	//

	setNav: function(nav) {
		this.$el.find('ul.nav > li.active').removeClass('active');
		if (nav) {
			this.$el.find('ul.nav > li > a.' + nav).closest('li').addClass('active');
		}
	},

	setStyles: function(header) {
		if (header.background) {
			this.$el.find('.navbar-inverse').addClass('colored').css('background', header.background);
		}
		if (header.font) {
			this.$el.find('.navbar-inverse').css('font-family', config.fonts[header.font]['font-family']);
		}
		if (header.height) {
			this.$el.css('min-height', header.height);
		}
	},

	setLogoStyles: function(logo) {
		if (logo.height) {
			this.$el.find('.logo').css('height', logo.height);
		}
		if (logo.background) {
			this.$el.find('.brand img').css('background', logo.background);
		}
		if (logo.border == 'round') {
			this.$el.find('.brand img').addClass('round');
		}
		if (logo.border == 'rounded') {
			this.$el.find('.brand img').addClass('rounded');
		}
		if (logo.rendering == "pixelated") {
			this.$el.find('.brand img').addClass('pixelated');
		}
	},

	setLogoTypeStyles: function(logotype) {
		if (logotype.color) {
			this.$el.find('.brand .logotype').css('color', logotype.color);
		}

		// set font styles
		//
		if (logotype.font && config.fonts[logotype.font]) {
			this.$el.find('.brand .logotype').css({
				'font-family': config.fonts[logotype.font]['font-family'],
				'font-size': config.fonts[logotype.font]['font-size'] + 'px',
			});
		}
		if (logotype.font_size) {
			this.$el.find('.brand .logotype').css('font-size', logotype.font_size);
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

		// set logotype component styles
		//
		if (logotype.prefix) {
			this.setTextElementStyles(this.$el.find('.brand .logotype .prefix'), logotype.prefix);
		}
		if (logotype.first) {
			this.setTextElementStyles(this.$el.find('.brand .logotype .first'), logotype.first);
		}
		if (logotype.middle) {
			this.setTextElementStyles(this.$el.find('.brand .logotype .middle'), logotype.middle);
		}
		if (logotype.last) {
			this.setTextElementStyles(this.$el.find('.brand .logotype .last'), logotype.last);
		}
		if (logotype.suffix) {
			this.setTextElementStyles(this.$el.find('.brand .logotype .suffix'), logotype.suffix);
		}
	},

	setTextElementStyles: function(element, attributes) {
		if (attributes.color) {
			$(element).css('color', attributes.color);
		}
		if (attributes.font && config.fonts[attributes.font]) {
			$(element).css('font-family', config.fonts[attributes.font]['font-family']);
		}
		if (attributes.font_size) {
			$(element).css('font-size', attributes.font_size);
		}
		if (attributes.font_style) {
			$(element).css('font-style', attributes.font_style);
		}
		if (attributes.font_weight) {
			$(element).css('font-weight', attributes.font_weight);
		}
	},

	setHeaderStyles: function(header) {
		if (header.color) {
			this.$el.find('.navbar-inverse .navbar-nav li a').css('color', header.color).addClass('colored');
		}
		if (header.nav) {
			this.setNavStyles(header.nav);
		}
	},

	setNavStyles: function(nav) {
		if (nav.color) {
			this.$el.find('.navbar-nav').css({
				'color': nav.color,
				'font-family': nav.font
			});
		}
	},

	setButtonStyles: function(buttons) {
		if (buttons.signin) {
			this.setSignInStyles(buttons.signin);
		}
		if (buttons.signup) {
			this.setSignUpStyles(buttons.signup);
		}
	},

	setSignInStyles: function(signin) {
		if (signin.background) {
			this.$el.find('.buttons .sign-in').css({
				'background': signin.background,
				'border-color': signin.background
			});
		}
		if (signin.color) {
			this.$el.find('.buttons .sign-in').css('color', signin.color);
		}
		if (signin.font) {
			this.$el.find('.buttons .sign-in').css('font-family', config.fonts[signin.font]['font-family']);
		}
	},

	setSignUpStyles: function(signup) {
		if (signup.background) {
			this.$el.find('.buttons .sign-up').css({
				'background': signup.background,
				'border-color': signup.background
			});
		}
		if (signup.color) {
			this.$el.find('.buttons .sign-up').css('color', signup.color);
		}
		if (signup.font) {
			this.$el.find('.buttons .sign-up').css('font-family', config.fonts[signup.font]['font-family']);
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			defaults: config.defaults,
			branding: config.branding,
			nav: this.options.nav,
			show_sign_in: application.session.has('config'),
			show_sign_up: application.session.has('config')? application.session.get('config').sign_up_enabled : false,
			is_mobile: Browser.is_mobile
		};
	},

	onRender: function() {

		// apply custom styles
		//
		this.setStyles(config.branding.header);
		this.setLogoStyles(config.branding.header.brand.logo);
		this.setLogoTypeStyles(config.branding.header.brand.logotype);
		this.setHeaderStyles(config.branding.header);
		this.setButtonStyles(config.branding.header.buttons);
	},

	//
	// mouse event handling methods
	//

	onClickBrand: function() {
		application.navigate('#', {
			trigger: true
		});
	},

	onClickSignIn: function() {
		application.signIn();
	},

	onClickSignUp: function() {
		application.signUp();
	},

	//
	// cleanup method
	//

	onBeforeDestroy: function() {
		$('.tooltip').remove();
	}
});