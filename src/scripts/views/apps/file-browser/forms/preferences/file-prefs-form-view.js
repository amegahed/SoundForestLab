/******************************************************************************\
|                                                                              |
|                            file-prefs-form-view.js                           |
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

import PreferencesFormView from '../../../../../views/apps/common/forms/preferences-form-view.js';
import '../../../../../../vendor/bootstrap/js/plugins/bootstrap-select/bootstrap-select.js';

export default PreferencesFormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="show-items form-group">
			<label class="control-label"><i class="fa fa-eye"></i>Show</label>
			<div class="controls">
			
				<div class="show-hidden-files checkbox-inline">
					<label><input type="checkbox"<% if (show_hidden_files) { %> checked<% } %>>Hidden Files</label>
				</div>
		
				<div class="show-thumbnails checkbox-inline">
					<label><input type="checkbox"<% if (show_thumbnails) { %> checked<% } %>>Thumbnails</label>
				</div>

				<div class="show-image-names checkbox-inline">
					<label><input type="checkbox"<% if (show_image_names) { %> checked<% } %>>Image Names</label>
				</div>

				<div class="show-file-extensions checkbox-inline">
					<label><input type="checkbox"<% if (show_file_extensions) { %> checked<% } %>>File Extensions</label>
				</div>
		
				<i class="active fa fa-question-circle" data-toggle="popover" title="Show" data-content="This determines which items are to be shown or hidden."></i>
			</div>
		</div>
		
		<div class="show-clipboard-confirm form-group">
			<label class="control-label"><i class="fa fa-clipboard"></i>Clipboard </label>
			<div class="controls">
		
				<div class="radio-inline">
					<label><input type="radio" name="clipboard-confirm" value="clipboard-replace"<% if (!show_clipboard_confirm) { %> checked<% } %>>Replace</label>
				</div>
		
				<div class="radio-inline">
					<label><input type="radio" name="clipboard-confirm" value="clipboard-confirm"<% if (show_clipboard_confirm) { %> checked<% } %>>Confirm</label>
				</div>
		
				<i class="active fa fa-question-circle" data-toggle="popover" title="Clipboard" data-content="This determines what to do if an item to be cut or copied already exists on the clipboard."></i>
			</div>
		</div>
	`),

	events: {
		'change .show-hidden-files input': 'onChangeShowHiddenFiles',
		'change .show-thumbnails input': 'onChangeShowThumbnails',
		'change .show-file-extensions input': 'onChangeShowFileExtensions',
		'change .view-magnified input': 'onChangeViewMagnified',
		'change .show-clipboard-confirm input': 'onChangeShowClipboardConfirm',
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'show_hidden_files':
				return this.$el.find('.show-hidden-files input').is(':checked');
			case 'show_thumbnails':
				return this.$el.find('.show-thumbnails input').is(':checked');
			case 'show_image_names':
				return this.$el.find('.show-image-names input').is(':checked');
			case 'show_file_extensions':
				return this.$el.find('.show-file-extensions input').is(':checked');
			case 'show_clipboard_confirm':
				return this.$el.find('.show-clipboard-confirm input:checked').val() == 'clipboard-confirm';
		}
	},

	getValues: function() {
		return {
			show_hidden_files: this.getValue('show_hidden_files'),
			show_thumbnails: this.getValue('show_thumbnails'),
			show_image_names: this.getValue('show_image_names'),
			show_file_extensions: this.getValue('show_file_extensions'),
			show_clipboard_confirm: this.getValue('show_clipboard_confirm')
		};
	},

	//
	// event handling methods
	//

	onChangeShowHiddenFiles: function() {
		this.onChangeValue('show_hidden_files', this.getValue('show_hidden_files'));
	},

	onChangeShowThumbnails: function() {
		this.onChangeValue('show_thumbnails', this.getValue('show_thumbnails'));
	},

	onChangeShowImageNames: function() {
		this.onChangeValue('show_image_names', this.getValue('show_image_names'));
	},

	onChangeShowFileExtensions: function() {
		this.onChangeValue('show_file_extensions', this.getValue('show_file_extensions'));
	},

	onChangeShowClipboardConfirm: function() {
		this.onChangeValue('show_clipboard_confirm', this.getValue('show_clipboard_confirm'));
	},
});