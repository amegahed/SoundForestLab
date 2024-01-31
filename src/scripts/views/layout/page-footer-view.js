/******************************************************************************\
|                                                                              |
|                             page-footer-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a page footer and associated content.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FooterView from '../../views/layout/footer-view.js';

export default FooterView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="info content">
		
				<% if (branding.page.footer.logo) { %>
				<a href="#"><img class="logo icon" src="<%= branding.page.footer.logo.src %>" /></a>
				<% } %>
		
				<% if (branding.page && branding.page.footer && branding.page.footer.links) { %>
				<div class="links">
					<% let keys = Object.keys(branding.page.footer.links); %>
					<% for (let i = 0; i < keys.length; i++) { %>
					<% let key = keys[i]; %>
					<% let link = branding.page.footer.links[key]; %>
		
					<a href="<%= link.href %>">
						<i class="<%= link.icon %>"></i>
						<%= key %>
					</a>
		
					<% if (i < keys.length - 1) { %>
					&nbsp; | &nbsp
					<% } %>
					<% } %>
				</div>
				<% } %>
			</div>
		</div>
		
		<div class="branding content">
			<% if (branding.footer.copyright) { %>
			<div class="fineprint copyright">
				<% if (branding.footer.copyright.url) { %><a href="<%= branding.footer.copyright.url %>"><% } %>
				<span class="year">Copyright &copy; <%= branding.footer.copyright.year %></span>
		
				<% if (branding.footer.copyright.logo) { %>
				<img class="desktop-only pixelated logo" src="<%= branding.footer.copyright.logo %>" />
				<% } %>
		
				<span class="entity"><%= branding.footer.copyright.entity %></span>
				<% if (branding.footer.copyright.url) { %></a><% } %>
			</div>
			<% } %>
		
			<div class="fineprint trademark">
				<% if (branding.footer.copyright.entity != 'Sharedigm') { %>powered by 
				<a class="brand" href="http://www.sharedigm.com" target="blank"><img class="logo" src="images/logos/zigzag.svg" />Sharedigm</a><% } else { %>
				<a class="company" href="http://www.megahedlabs.com" target="_blank">
					<img class="logo" src="images/logos/beanie@2x.png" height="20px" style="margin-right:5px; margin-top:-5px" />Megahed Labs</a>
				<% } %>
			</div>
		</div>
	`),

	//
	// setting methods
	//

	setPageFooterStyles: function(footer) {
		if (footer.color) {
			this.$el.find('.info, .info a').css('color', footer.color);
		}
		if (footer.background) {
			this.$el.find('.info.content').css('background', footer.background);		
		}
		if (footer.font) {
			this.$el.find('.info').css('font-family', config.fonts[footer.font]['font-family']);	
		}
	},

	setLogoStyles: function(logo) {
		if (logo.background) {
			this.$el.find('.info .logo').css('background', logo.background);
		}
		if (logo.height) {
			this.$el.find('.info .logo').css('height', logo.height);
		}
		if (logo.border == 'round') {
			this.$el.find('.info .logo').addClass('round');
		}
		if (logo.border == 'rounded') {
			this.$el.find('.info .logo').addClass('rounded');
		}
		if (logo.rendering) {
			this.$el.find('.info .logo').addClass(logo.rendering);
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			branding: config.branding
		};
	},

	onRender: function() {

		// set styles
		//
		if (config.branding.footer) {
			this.setFooterStyles(config.branding.footer);
		}
		if (config.branding.page.footer) {
			this.setPageFooterStyles(config.branding.page.footer);
		}
		if (config.branding.page.footer.logo) {
			this.setLogoStyles(config.branding.page.footer.logo);
		}
	}
});