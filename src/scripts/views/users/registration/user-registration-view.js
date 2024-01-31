/******************************************************************************\
|                                                                              |
|                             user-registration-view.js                        |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the introductory view of the application.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import User from '../../../models/users/user.js';
import UserAccount from '../../../models/users/account/user-account.js';
import EmailVerification from '../../../models/users/account/email-verification.js';
import BaseView from '../../../views/base-view.js';
import UserNameFormView from '../../../views/users/forms/user-name-form-view.js';
import NewUserAccountFormView from '../../../views/users/registration/forms/new-user-account-form-view.js';
import EmailVerificationView from '../../../views/users/registration/email/email-verification-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	template: template(`
		<h1><i class="fa fa-check"></i>User Registration Form</h1>
		
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i>Home</li></a>
			<li><i class="fa fa-check"></i>User Registration Form</li>
		</ol>
		
		<div class="content">
			<div class="alert alert-warning alert-dismissable" style="display:none">
				<button type="button" class="close-btn btn btn-sm" data-dismiss="alert">
					<i class="fa fa-xmark"></i>
				</button>
				<label>Error: </label><span class="message">This form contains errors.  Please correct and resubmit.</span>
			</div>
		
			<div class="user-name-form"></div>
			<div class="new-user-account-form"></div>
		
			<form>
				<div class="notes">
					<span class="required"></span>Fields are required
				</div>
			</form>
		</div>
		
		<div class="buttons">
			<button type="submit" class="submit btn btn-primary btn-lg">
				<i class="fa fa-check"></i>Register
			</button>
			<button class="cancel btn btn-lg">
				<i class="fa fa-xmark"></i>Cancel
			</button>
		</div>
	`),

	regions: {
		name_form: {
			el: '.user-name-form',
			replaceElement: true
		},
		account_form: {
			el: '.new-user-account-form',
			replaceElement: true
		}
	},

	events: {
		'click .alert .close-btn': 'onClickAlertClose',
		'click .aup': 'onClickAup',
		'click .submit': 'onClickSubmit',
		'click .cancel': 'onClickCancel'
	},

	//
	// constructor
	//

	initialize: function() {
		this.model = new User();
		this.account = new UserAccount();
	},

	//
	// verificating methods
	//

	verifyEmail: function() {

		// create a new email verification
		//
		let emailVerification = new EmailVerification({
			user_id: this.model.get('id'),
			email: this.model.get('email')
		});

		// save email verification
		//
		emailVerification.save({
			verify_route: '#register/verify-email'
		}, {
			// callbacks
			//
			success: () => {

				// show email verification page
				//
				application.showPage(new EmailVerificationView({
					model: this.model
				}));
			},

			error: (model, response) => {

				// show error message
				//
				application.error({
					message: "Could not save email verification.",
					response: response
				});
			}
		});
	},

	//
	// form submission methods
	//

	submit: function(options) {

		// check for validity
		//
		if (this.getChildView('name_form').isValid() && 
			this.getChildView('account_form').isValid()) {

			// get form values
			//
			let username = this.getChildView('name_form').getValues();
			let userAccount = this.getChildView('account_form').getValues();

			// check to see if model is valid
			//
			new UserAccount().checkValidation({
				username: userAccount.username,
				email: userAccount.email
			}, {

				// callbacks
				//
				success: () => {

					// create new user
					//
					this.model.save(_.extend(username, userAccount, {
						user_invitation_id: this.options.user_invitation? this.options.user_invitation.get('id'): null
					}), options);
				},

				error: (response) => {
					this.showUserValidationError(JSON.parse(response.responseText));
				}
			});
		} else {

			// display error message
			//
			this.showWarning();	
		}

		/*

		// check validation
		//
		let validUserName = this.getChildView('name_form').isValid()
		let validUserAccount = this.getChildView('account_form').isValid();

		if (validUserName && validUserAccount) {

			// update model
			//
			this.model.set(this.getChildView('account_form').getValues());

			// check to see if model is valid
			//
			new UserAccount().checkValidation({
				username: this.account.get('username'),
				email: this.account.get('email')
			}, {

				// callbacks
				//
				success: () => {

					// set user name
					//
					this.getChildView('name_form').update();

					// create new user
					//
					this.model.save(_.extend(this.model.attributes, this.account.attributes, {
						user_invitation_id: this.options.user_invitation? this.options.user_invitation.get('id'): null
					}), options);
				},

				error: (response) => {
					this.showUserValidationError(JSON.parse(response.responseText));
				}
			});
		} else {

			// display error message
			//
			this.showWarning();
		}
		*/
	},

	//
	// rendering methods
	//

	onRender: function() {

		// show child views
		//
		this.showChildView('name_form', new UserNameFormView({
			model: this.model,
			collapsed: true
		}));
		this.showChildView('account_form', new NewUserAccountFormView({
			model: this.account,
			focusable: null
		}));
	},

	showUserValidationError: function(errors) {
		import(
			'../../../views/users/authentication/dialogs/user-validation-error-dialog-view.js'
		).then((UserValidationErrorDialogView) => {

			// show user validation dialog
			//
			application.show(new UserValidationErrorDialogView.default({
				errors: errors
			}));
		});
	},

	showWarning: function(message) {	
		if (message) {
			this.$el.find('.alert-warning .message').html(message);
		}
		this.$el.find('.alert-warning').show();
	},

	hideWarning: function() {
		this.$el.find('.alert-warning').hide();
	},

	//
	// mouse event handling methods
	//

	onClickAlertClose: function() {
		this.hideWarning();
	},
	
	onClickAup: function() {

		// go to aup view
		//
		application.navigate('register', {
			trigger: true,
			reset: true
		});
	},

	onClickSubmit: function() {

		// submit form
		//
		this.submit({

			// callbacks
			//
			success: () => {

				// verify email
				//
				this.verifyEmail();
			},

			error: (model, response) => {

				// show error message
				//
				application.error({
					message: "Could not create new user.",
					response: response
				});
			}
		});
	},

	onClickCancel: function() {

		// go to home view
		//
		application.navigate('', {
			trigger: true
		});
	}
});
