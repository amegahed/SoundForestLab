/******************************************************************************\
|                                                                              |
|                            welcome-dialog-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a dialog box that is shown to first time users.          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import VideoFile from '../../../models/files/video-file.js';
import Directory from '../../../models/files/directory.js';
import Contacts from '../../../collections/contacts/contacts.js';
import UserPreferences from '../../../models/preferences/user-preferences.js';
import Items from '../../../collections/files/items.js';
import DialogView from '../../../views/dialogs/dialog-view.js';
import GoogleContactsImportable from '../../../views/apps/common/behaviors/importing/google-contacts-importable.js';

export default DialogView.extend(_.extend({}, GoogleContactsImportable, {

	//
	// attributes
	//

	template: template(`
		<div class="modal-dialog">
		
			<div class="modal-header">
				<div class="heading">
					<div class="icon">
						<i class="<%= icon || 'fa fa-hand-spock' %>"></i>
					</div>
					<div class="title">
						<%= title %>
					</div>
				</div>
			</div>
		
			<div class="modal-content">
				<div class="modal-body">
		
					<div style="text-align:center; margin-top:10px">
						<div class="logo">
							<img <% if (pixelated) { %>class="pixelated" <% } %>src="<%= logo_url %>" style="height:50px" />
						</div>
						<h3><%= greeting %></h3>
					</div>
		
					<p style="margin: 0 20px">
						<%= message %>
					</p>
		
					<div class="container" style="width:100%; overflow:auto">
						<div class="row" style="text-align:center; margin-top:10px">
							<% let keys = Object.keys(options); %>
							<% for (let i = 0; i < keys.length; i++) { %>
							<% let key = keys[i]; %>
							<% let option = options[key]; %>
		
							<% if (option.enabled) { %>
							<div class="well" style="display:inline-block; width:210px; text-align:center;  margin:5px; padding:10px">
								<p style="display:inline-block; margin:auto; margin-bottom:5px; max-width:200px; height:3em"><%= option.message %></p>
								<button class="<%= key.replace(/_/g, '-') %> btn">
									<i class="<%= option.icon %>"></i>
									<%= option.label %>
								</button>
							</div>
							<% } %>
		
							<% } %>
						</div>
					</div>
				</div>
		
				<div class="modal-footer">
					<div class="buttons">
						<button class="ok btn btn-primary" data-dismiss="modal">
							<i class="fa fa-arrow-right"></i>Start Using <%= application.name %>
						</button>
					</div>
				</div>
			</div>
		</div>
	`),

	events: _.extend({}, DialogView.prototype.events, {
		'click .view-video': 'onClickViewVideo',
		'click .view-slide-show': 'onClickViewSlideShow',
		'click .set-theme': 'onClickSetTheme',
		'click .set-notifications': 'onClickSetNotifications',
		'click .edit-profile': 'onClickEditProfile',
		'click .import-contacts': 'onClickImportContacts',
		'click .invite-contacts': 'onClickInviteContacts',
		'click .ok': 'onClickOk'
	}),

	//
	// methods
	//

	showSlideShow: function(path) {

		// load contents of welcome directory
		//
		new Directory({
			path: path
		}).load({

			// callbacks
			//
			success: (model) => {
				application.launch('image_viewer', {

					// find first image
					//
					model: model.contents.filter(Items.filters.is_image)[0],
					preferences: UserPreferences.create('image_viewer', {
						show_sidebar: false
					}),
					slide_show: true
				}, {
					maximized: true,
					full_screen: true,
				});
			},

			error: () => {
				application.error({
					message: 'Slide show not found.'
				});
			}	
		});
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

	setTheme: function() {
		application.launch('theme_picker');
	},

	setNotifications: function() {
		application.launch('settings_manager', {
			nav: 'Notifications'
		});
	},

	importContacts: function() {
		application.launch('contact_editor', {
			import: true
		});
	},

	inviteContacts: function() {
		this.importGoogleContacts((contacts) => {

			// show invite google contacts dialog
			//
			this.showGoogleContactsDialog(contacts);
		});
	},

	editProfile: function() {
		application.launch('profile_viewer');
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return _.extend({}, config.welcome, {
			logo_url: config.branding.welcome.splash.brand.logo.src,
			pixelated: config.branding.welcome.splash.brand.logo.rendering
		});
	},

	//
	// dialog rendering methods
	//

	showGoogleContactsDialog: function(contacts) {
		import(
			'../../../views/apps/profile-browser/dialogs/invitations/invite-google-contacts-dialog-view.js'
		).then((InviteGoogleContactsDialogView) => {

			// show invite google contacts dialog
			//
			application.show(new InviteGoogleContactsDialogView.default({
				collection: new Contacts(contacts),
				message: config.apps.profile_browser.invitation_message
			}));
		});
	},

	//
	// mouse event handling methods
	//

	onClickViewVideo: function() {
		this.showVideo(config.welcome.options.view_video.path);
	},

	onClickViewSlideShow: function() {
		this.showSlideShow(config.welcome.options.view_slide_show.path);
	},

	onClickSetTheme: function() {
		this.setTheme();
	},

	onClickSetNotifications: function() {
		this.setNotifications();
	},

	onClickEditProfile: function() {
		this.editProfile();
	},

	onClickImportContacts: function() {
		this.importContacts();
	},

	onClickInviteContacts: function() {
		this.inviteContacts();
	},

	onClickOk: function() {
		application.session.user.start();
	}
}));