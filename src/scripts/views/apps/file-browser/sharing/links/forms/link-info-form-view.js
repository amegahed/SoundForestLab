/******************************************************************************\
|                                                                              |
|                            link-info-form-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a form for defining link attributes.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import File from '../../../../../../models/files/file.js';
import Directory from '../../../../../../models/files/directory.js';
import Volume from '../../../../../../models/files/volume.js';
import InfoFormView from '../../../../../../views/apps/common/forms/info-form-view.js';
import FileIconView from '../../../../../../views/apps/file-browser/mainbar/files/icons/file-icon-view.js';
import DirectoryIconView from '../../../../../../views/apps/file-browser/mainbar/files/icons/directory-icon-view.js';
import VolumeIconView from '../../../../../../views/apps/file-browser/mainbar/files/icons/volume-icon-view.js';
import LinkMessageFormView from '../../../../../../views/apps/file-browser/sharing/links/forms/link-message-form-view.js';
import LinkExpirationFormView from '../../../../../../views/apps/file-browser/sharing/links/forms/link-expiration-form-view.js';
import LinkPasswordFormView from '../../../../../../views/apps/file-browser/sharing/links/forms/link-password-form-view.js';

export default InfoFormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="items">
			<div class="icon-grid"></div>
		</div>

		<ul class="nav nav-tabs" role="tablist">
		
			<li role="presentation" class="protection-tab active">
				<a role="tab" data-toggle="tab" href=".message-panel">
					<i class="fa fa-quote-left"></i>
					<label>Message</label>
				</a>
			</li>
		
			<li role="presentation" class="expiration-tab">
				<a role="tab" data-toggle="tab" href=".expiration-panel">
					<i class="fa fa-clock"></i>
					<label>Expiration</label>
				</a>
			</li>
			
			<li role="presentation" class="protection-tab">
				<a role="tab" data-toggle="tab" href=".protection-panel">
					<i class="fa fa-key"></i>
					<label>Protection</label>
				</a>
			</li>
		</ul>
		
		<div class="tab-content">
		
			<div role="tabpanel" class="message-panel tab-pane active">
				<div class="well">
					<i class="fa fa-info-circle"></i>
					You may optionally provide a message to the link recipient.
				</div>
				<div class="link-message-form"></div>
			</div>
		
			<div role="tabpanel" class="expiration-panel tab-pane">
				<div class="well">
					<i class="fa fa-info-circle"></i>
					Links can be set to self destruct after which they can no longer be used.
				</div>
				<div class="link-expiration-form"></div>
			</div>
		
			<div role="tabpanel" class="protection-panel tab-pane">
				<div class="well">
					<i class="fa fa-info-circle"></i>
					Links can be be protected so that the user of a link must provide a password.
				</div>
				<div class="link-password-form"></div>
			</div>
		</div>
	`),

	regions: {
		item: '.icon-grid',
		message: '.link-message-form',
		expiration: '.link-expiration-form',
		protection: '.link-password-form'
	},

	//
	// data getting methods
	//

	getData: function() {
		return {
			message: this.getChildView('message').getMessage(),
			limit: this.getChildView('expiration').getLimit(),
			expiration_date: this.getChildView('expiration').getExpirationDate(),
			password: this.getChildView('protection').getPassword()
		};
	},

	getItemIconView: function(item) {
		if (item instanceof Volume) {
			return VolumeIconView;
		} else if (item instanceof File) {
			return FileIconView;
		} else if (item instanceof Directory) {
			return DirectoryIconView;
		}
	},

	//
	// rendering methods
	//

	showRegion: function(name) {
		switch (name) {
			case 'item':
				this.showItem();
				break;
			case 'message':
				this.showMessage();
				break;
			case 'expiration':
				this.showExpiration();
				break;
			case 'protection':
				this.showProtection();
				break;
		}
	},

	showItem: function() {
		let item = this.model.get('target');
		let ItemIconView = this.getItemIconView(item);

		this.showChildView('item', new ItemIconView({
			model: item,

			// capabilities
			//
			selectable: false
		}));
	},

	showMessage: function() {
		this.showChildView('message', new LinkMessageFormView({
			model: this.model
		}));
	},

	showExpiration: function() {
		this.showChildView('expiration', new LinkExpirationFormView({
			model: this.model
		}));
	},

	showProtection: function() {
		this.showChildView('protection', new LinkPasswordFormView({
			model: this.model
		}));
	}
});