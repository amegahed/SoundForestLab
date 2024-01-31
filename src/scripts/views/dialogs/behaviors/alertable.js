/******************************************************************************\
|                                                                              |
|                                 alertable.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for showing types of alert dialogs.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import AlertDialogView from '../../../views/dialogs/alerts/alert-dialog-view.js';
import NotifyDialogView from '../../../views/dialogs/alerts/notify-dialog-view.js';
import ConfirmDialogView from '../../../views/dialogs/alerts/confirm-dialog-view.js';
import PromptDialogView from '../../../views/dialogs/alerts/prompt-dialog-view.js';
import ErrorDialogView from '../../../views/dialogs/alerts/error-dialog-view.js';

export default {

	alert: function(options) {

		// show alert dialog
		//
		if (AlertDialogView.current) {
			AlertDialogView.current.update(options);
		} else {
			this.show(new AlertDialogView(options));
		}
	},

	notify: function(options) {

		// show notify dialog
		//
		if (NotifyDialogView.current) {
			NotifyDialogView.current.update(options);
		} else {
			this.show(new NotifyDialogView(options));
		}
	},

	confirm: function(options) {

		// show confirm dialog
		//
		this.show(new ConfirmDialogView(options));
	},

	prompt: function(options) {

		// show prompt dialog
		//
		this.show(new PromptDialogView(options));
	},

	error: function(options) {

		// do not show error for aborted requests
		//
		if (options && options.response && 
			options.response.statusText == 'abort') {
			return;
		}

		// show error message
		//
		if (ErrorDialogView.current) {
			ErrorDialogView.current.update(options);
		} else {
			this.show(new ErrorDialogView(options));
		}
	}
};