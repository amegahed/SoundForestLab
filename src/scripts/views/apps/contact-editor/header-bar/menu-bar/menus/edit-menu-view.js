/******************************************************************************\
|                                                                              |
|                               edit-menu-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying file dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import UserJob from '../../../../../../models/users/profile/user-job.js';
import MenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/menu-view.js';

export default MenuView.extend({

	//
	// attributes
	//

	template: template(`
		<li role="presentation" class="work option">
			<a class="add-job"><i class="fa fa-plus"></i>Add Organization</a>
		</li>
		
		<li role="presentation" class="work option disabled">
			<a class="edit-job"><i class="fa fa-pencil-alt"></i>Edit Organization</a>
		</li>
		
		<li role="presentation" class="work option disabled">
			<a class="delete-job"><i class="fa fa-trash-alt"></i>Delete Organization<span class="shortcut">delete</span></a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation" class="contact option">
			<a class="add-contact"><i class="fa fa-plus"></i>Add Contact</a>
		</li>
		
		<li role="presentation" class="contact option disabled">
			<a class="edit-contact"><i class="fa fa-pencil-alt"></i>Edit Contact</a>
		</li>
		
		<li role="presentation" class="contact option disabled">
			<a class="delete-contact"><i class="fa fa-trash-alt"></i>Delete Contacts<span class="shortcut">delete</span></a>
		</li>
	`),

	events: {

		// work options
		//
		'click .add-job': 'onClickAddJob',
		'click .edit-job': 'onClickEditJob',
		'click .delete-job': 'onClickDeleteJob',

		'click .add-contact': 'onClickAddContact',
		'click .edit-contact': 'onClickEditContact',
		'click .delete-contact': 'onClickDeleteContact'
	},

	//
	// querying methods
	//

	enabled: function() {
		let organizationView = this.getOrganizationView();
		let contactsView = this.getContactsView();
		let numJobs = organizationView? organizationView.collection.length : 0;
		let numSelectedJobs = organizationView? organizationView.numSelected() : 0;
		let numSelectedContacts = contactsView? contactsView.numSelected() : 0;
		let hasJobs = numJobs > 0;
		let hasSelectedJobs = numSelectedJobs > 0;
		let hasSelectedContacts = numSelectedContacts > 0;

		return {
			'add-job': !hasJobs,
			'edit-job': hasSelectedJobs,
			'delete-job': hasSelectedJobs,
			'add-contact': true,
			'edit-contact': hasSelectedContacts,
			'delete-contact': hasSelectedContacts,
		};
	},

	//
	// getting methods
	//

	getOrganizationView: function() {
		return this.parent.app.getActiveView().getChildView('organization');
	},

	getContactsView: function() {
		return this.parent.app.getActiveView().getChildView('info');
	},

	getJob: function() {
		return this.getOrganizationView().getChildView('items').getChildViewAt(0);
	},

	getSelectedContact: function() {
		return this.getContactsView().getSelected()[0];
	},

	//
	// mouse event handling methods
	//

	onClickAddJob: function() {
		this.getOrganizationView().addItem();
	},
	
	onClickEditJob: function() {
		this.getJob().edit();
	},

	onClickDeleteJob: function() {
		this.getJob().delete();
	},

	onClickAddContact: function() {
		this.getContactsView().addItem();
	},

	onClickEditContact: function() {
		this.getSelectedContact().edit();
	},

	onClickDeleteContact: function() {
		this.getSelectedContact().delete();
	},

	//
	// collection event handling methods
	//

	onAdd: function(item) {
		if (item instanceof UserJob) {
			this.setItemDisabled('add-job');
			this.setItemDisabled('edit-job');
			this.setItemDisabled('delete-job');
		}
	},

	onRemove: function(item) {
		if (item instanceof UserJob) {
			this.setItemEnabled('add-job');
			this.setItemDisabled('edit-job');
			this.setItemDisabled('delete-job');
		}
	}
});