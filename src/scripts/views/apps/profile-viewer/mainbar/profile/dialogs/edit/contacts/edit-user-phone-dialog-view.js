/******************************************************************************\
|                                                                              |
|                         edit-user-phone-dialog-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for editing a phone number of a user's profile.        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormModalView from '../../../../../../../../views/forms/dialogs/form-modal-view.js';
import UserPhoneFormView from '../../../../../../../../views/apps/profile-viewer/mainbar/profile/forms/contacts/user-phone-form-view.js';

export default FormModalView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="modal-dialog">
			
			<div class="modal-header">
				<div class="heading">
					<div class="icon">
						<i class="fa fa-pencil-alt"></i>
					</div>
					<div class="title">
						Edit Phone Number
					</div>
				</div>
			</div>
		
			<div class="modal-content">
				<div class="modal-body"></div>
				
				<div class="modal-footer">
					<div class="buttons">
						<button class="save btn btn-primary" data-dismiss="modal" disabled>
							<i class="fa fa-save"></i>Save
						</button>
						<button class="cancel btn" data-dismiss="modal">
							<i class="fa fa-xmark"></i>Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	`),

	events: _.extend({}, FormModalView.prototype.events, {
		'click .save': 'onClickSave',
		'click .cancel': 'onClickCancel'
	}),

	//
	// setting methods
	//

	setDisabled: function(disabled) {
		this.$el.find('.save').prop('disabled', disabled !== false);
	},

	//
	// rendering methods
	//

	form: function() {
		return new UserPhoneFormView({
			model: this.model,

			// callbacks
			//
			onvalidate: (valid) => this.setDisabled(!valid)
		});
	},

	//
	// mouse event handling methods
	//
	
	onClickSave: function() {

		// submit form
		//
		if (!this.getChildView('form').submit({

			// callbacks
			//
			success: () => {
				this.close();

				// perform callback
				//
				if (this.options.onchange) {
					this.options.onchange();
				}
			},

			error: (model, response) => {

				// show error message
				//
				application.error({
					message: "Could not save user's phone number.",
					response: response
				});
			}
		})) {

			// disable save button
			//
			this.setDisabled(true);
		}
	},

	onClickCancel: function() {
		this.close();
	},
});
