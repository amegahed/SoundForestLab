/******************************************************************************\
|                                                                              |
|                           new-user-account-form-view.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an editable form view of a new user's account            |
|        information.                                                          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import UserAccount from '../../../../models/users/account/user-account.js';
import FormView from '../../../../views/forms/form-view.js';
import PasswordPolicy from '../../../../utilities/security/password-policy.js';
import '../../../../views/forms/validation/authentication-rules.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<fieldset>
			<legend>Account info</legend>
		
			<div class="username form-group">
				<label class="required control-label"><i class="fa fa-user"></i>Username</label>
				<div class="controls">
					<div class="input-group">
						<input type="text" class="required form-control" name="username" value="<%= username %>">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Username" data-content="Your username is the name that you use to sign in to the web site."></i>
						</div>
					</div>
				</div>
			</div>
		
			<div class="password form-group">
				<label class="required control-label"><i class="fa fa-key"></i>Password</label>
				<div class="controls">
					<div class="input-group">
						<input type="password" class="form-control" autocomplete="off" name="password" maxlength="200">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Password" data-content="<%= password_policy %>"></i>
						</div>
					</div>
					<div class="password-meter" style="display:none">
						<label class="password-meter-message"></label>
						<div class="password-meter-bg">
							<div class="password-meter-bar"></div>
						</div>
					</div>
				</div>
			</div>
		
			<div class="confirm-password form-group">
				<label class="required control-label"><i class="fa fa-redo"></i>Confirm PW</label>
				<div class="controls">
					<div class="input-group">
						<input type="password" class="required form-control" autocomplete="off" name="confirm-password" maxlength="200">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Confirm password" data-content="Please retype your new password exactly as you first entered it."></i>
						</div>
					</div>
				</div>
			</div>
		</fieldset>
		
		<fieldset>
			<legend>Verification info</legend>
		
			<div class="email form-group">
				<label class="required control-label"><i class="fa fa-envelope"></i>Email</label>
				<div class="controls">
					<div class="input-group">
						<input type="text" class="required email form-control" name="email" placeholder="name@domain" value="<%= email %>">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Email" data-content="A valid email address is required and will be used for your account registration and for password recovery."></i>
						</div>
					</div>
				</div>
			</div>

			<div class="confirm-email form-group">
				<label class="required control-label"><i class="fa fa-redo"></i>Confirm email</label>
				<div class="controls">
					<div class="input-group">
						<input type="text" class="required confirm-email form-control" name="confirm-email" placeholder="name@domain" value="<%= email %>">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Confirm email address" data-content="Please retype your previously entered email address for verification."></i>
						</div>
					</div>
				</div>
			</div>
		</fieldset>
	`),

	events: {
		'click .generate': 'onClickGenerate',
		'blur .email input': 'onBlurEmail',
		'blur .username input': 'onBlurUsername'
	},

	//
	// form attributes
	//

	showPasswordMeter: false,

	//
	// form attributes
	//

	rules: {
		'username': {
			required: true,
			username: true						
		},
		'confirm-email': {
			required: true,
			equalTo: '.email input'
		},
		'password': {
			required: true,
			passwordStrongEnough: true
		},
		'confirm-password': {
			required: true,
			equalTo: '.password input'
		}
	},

	messages: {
		'email': {
			required: "Enter a valid email address.",
			email: "This email address is not valid."
		},
		'confirm-email': {
			required: "Re-enter your email address.",
			equalTo: "Retype the email address above."
		},
		'username': {
			required: "Enter a username / login.",
			minlength: $.validator.format("Enter at least {0} characters.")
		},
		'password': {
			required: "Enter a password.",
			passwordStrongEnough: "Your password must be stronger."
		},
		'confirm-password': {
			required: "Re-enter your password.",
			equalTo: "Enter the same password as above."
		}
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'email':
				return this.$el.find('.email input').val();
			case 'username':
				return this.$el.find('.username input').val();
			case 'password':
				return this.$el.find('.password input').val();
		}
	},

	getValues: function() {		
		return {
			email: this.getValue('email'),
			username: this.getValue('username'),
			password: this.getValue('password')
		};
	},

	//
	// username getting methods
	//

	getCombinedUsername: function() {

		// propose a username by combining first and last name
		//
		let firstName = this.$el.find('.first-name input').val();
		let lastName = this.$el.find('.last-name input').val();
		if (firstName && lastName) {
			return firstName.toLowerCase() + '.' + lastName.toLowerCase();
		}
	},

	getRandomUsername: function() {

		// propose a username by appending a 5 digit random number to 'swamp'
		//
		return 'swamp' + Math.round(10000 + Math.random() * 90000);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			model: this.model,
			password_policy: PasswordPolicy.description
		};
	},

	//
	// mouse event handling methods
	//

	onClickGenerate: function(event) {

		// set username to generated value
		//
		this.$el.find('#username').val(this.getRandomUsername());

		// block event from parent
		//
		this.block(event);	
	},

	onBlurUsername: function(event) {
		let username = event.currentTarget.value;
		if (username !== '' && username !== ' ') {

			// check for username uniqueness
			//
			new UserAccount().checkValidation({
				'username': username
			}, {

				// callbacks
				//
				error: (response) => {
					let error = JSON.parse(response.responseText)[0];
					error = error.substr(0,1).toUpperCase() + error.substr(1);
					this.$el.validate().showLabel($('.username input')[0], error);
				}
			});
		}
	},

	onBlurEmail: function(event) {
		let email = event.currentTarget.value;
		if (email !== '' && email !== ' ') {

			// check for username uniqueness
			//
			new UserAccount().checkValidation({
				'email': email,
			}, {

				// callbacks
				//
				error: (response) => {
					let error = JSON.parse(response.responseText)[0];
					error = error.substr(0,1).toUpperCase() + error.substr(1);
					this.$el.validate().showLabel($('.email input')[0], error);
				}
			});
		}
	}
});