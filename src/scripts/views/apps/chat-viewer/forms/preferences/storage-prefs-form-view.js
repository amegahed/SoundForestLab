/******************************************************************************\
|                                                                              |
|                          storage-prefs-form-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a form used to specify user preferences.                 |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Directory from '../../../../../models/files/directory.js';
import PreferencesFormView from '../../../../../views/apps/common/forms/preferences-form-view.js';
import FileUtils from '../../../../../utilities/files/file-utils.js';

export default PreferencesFormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="uploads-directory form-group">
			<label class="control-label"><i class="fa fa-folder"></i>Uploads Folder</label>
			<div class="controls">
		
				<div class="control-inline">
					<span class="name"><%= uploads_directory %></span>
				</div>
		
				<div class="buttons-inline">
					<button type="button" class="change success btn btn-sm" data-toggle="tooltip" title="Change" data-placement="top">
						<i class="fa fa-folder"></i>
					</button>
					<button type="button" class="clear warning btn btn-sm" data-toggle="tooltip" title="Clear" data-placement="top">
						<i class="fa fa-xmark"></i>
					</button>
				</div>
		
				<i class="active fa fa-question-circle" data-toggle="popover" title="Uploads Folder" data-content="This is the directory to use when uploading files."></i>
			</div>
		</div>
		
		<div class="copy-attachments form-group">
			<label class="control-label"><i class="fa fa-copy"></i>Copy Attachments</label>
			<div class="controls">
			
				<div class="checkbox-inline">
					<input type="checkbox"<% if (copy_attachments) { %> checked<% } %>>
				</div>
		
				<i class="active fa fa-question-circle" data-toggle="popover" title="Copy Attachments" data-content="This is whether or not to copy attached files and images from their original location to the messages directory.  If they are copied, then if you delete the original files, then you will still be able to view the attachments."></i>
			</div>
		</div>
		
		<div class="messages-directory form-group">
			<label class="control-label"><i class="fa fa-folder"></i>Messages Folder</label>
			<div class="controls">
		
				<div class="control-inline">
					<span class="name"><%= messages_directory %></span>
				</div>
		
				<div class="buttons-inline">
					<button type="button" class="change success btn btn-sm" data-toggle="tooltip" title="Change" data-placement="top">
						<i class="fa fa-folder"></i>
					</button>
					<button type="button" class="clear warning btn btn-sm" data-toggle="tooltip" title="Clear" data-placement="top">
						<i class="fa fa-xmark"></i>
					</button>
				</div>
		
				<i class="active fa fa-question-circle" data-toggle="popover" title="Messages Folder" data-content="This is the directory to use when storing message attachments."></i>
			</div>
		</div>
	`),

	events: {
		'click .uploads-directory button.change': 'onClickChangeUploadsDirectory',
		'click .uploads-directory button.clear': 'onClickClearUploadsDirectory',
		'change .copy-attachments input': 'onChangeCopyAttachments',
		'click .messages-directory button.change': 'onClickChangeMessagesDirectory',
		'click .messages-directory button.clear': 'onClickClearMessagesDirectory'
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'uploads_directory':
				return this.$el.find('.uploads-directory .name').text();
			case 'copy_attachments':
				return this.$el.find('.copy-attachments input').is(':checked');
			case 'messages_directory':
				return this.$el.find('.messages-directory .name').text();
		}
	},

	getValues: function() {
		return {
			uploads_directory: this.getValue('uploads_directory'),
			copy_attachments: this.getValue('copy_attachments'),
			messages_directory: this.getValue('messages_directory')
		};
	},

	//
	// setting methods
	//

	setValue: function(key, value) {
		switch (key) {
			case 'uploads_directory':
				this.$el.find('.uploads-directory .name').text(value);
				break;
			case 'copy_attachments':
				this.$el.find('.copy-attachments input').prop('checked', value);
				break;
			case 'messages_directory':
				this.$el.find('.messages-directory .name').text(value);
				break;
		}
	},

	setUploadsDirectory: function() {
		let directory = this.model.get('uploads_directory');
		let dirname = FileUtils.default.getDirectoryName(directory);

		// load uploads directory
		//
		new Directory.default({
			path: FileUtils.default.getDirectoryPath(directory)
		}).load({

			// callbacks
			//
			success: (model) => {

				// select from directory's parent
				//
				this.showSelectUploadsDialog(model, {
					selected: model.getItemNamed(dirname)
				});
			},

			error: () => {

				// select from home directory
				//
				this.showSelectUploadsDialog(application.getDirectory());
			}
		});
	},
	
	setMessagesDirectory: function() {
		let directory = this.model.get('messages_directory');
		let dirname = FileUtils.default.getDirectoryName(directory);

		// load storage directory
		//
		new Directory.default({
			path: FileUtils.default.getDirectoryPath(directory)
		}).load({

			// callbacks
			//
			success: (model) => {

				// select from directory's parent
				//
				this.showSelectMessagesDialog(model, {
					selected: model.getItemNamed(dirname)
				});
			},

			error: () => {

				// select from home directory
				//
				this.showSelectMessagesDialog(application.getDirectory());
			}
		});
	},

	//
	// rendering methods
	//

	showSelectUploadsDialog: function(directory, options) {
		import(
			'../../../../../views/apps/file-browser/dialogs/files/open-items-dialog-view.js'
		).then((OpenItemsDialogView) => {

			// show select uploads dialog
			//
			application.show(new OpenItemsDialogView.default({
				model: directory,

				// options
				//
				title: "Select Uploads Directory",
				selected: options? options.selected : null,
			
				// callbacks
				//
				onopen: (items) => {
					if (items.length > 0) {
						this.setValue('uploads_directory', items[0].get('path'));
					}
				}
			}));
		});
	},

	showSelectMessagesDialog: function(directory, options) {
		import(
			'../../../../../views/apps/file-browser/dialogs/files/open-items-dialog-view.js'
		).then((OpenItemsDialogView) => {

			// show select messages dialog
			//
			application.show(new OpenItemsDialogView.default({
				model: directory,

				// options
				//
				title: "Select Messages Directory",
				selected: options? options.selected : null,
			
				// callbacks
				//
				onopen: (items) => {
					if (items.length > 0) {
						this.setValue('messages_directory', items[0].get('path'));
					}
				}
			}));
		});
	},

	//
	// mouse event handling methods
	//

	onClickChangeUploadsDirectory: function() {
		this.setUploadsDirectory();
	},

	onClickClearUploadsDirectory: function() {
		this.setValue('uploads_directory', '/');
	},

	onChangeCopyAttachments: function() {
		this.onChangeValue('copy_attachments', this.getValue('copy_attachments'));
	},

	onClickChangeMessagesDirectory: function() {
		this.setMessagesDirectory();
	},

	onClickClearMessagesDirectory: function() {
		this.setValue('messages_directory', '/');
	}
});
