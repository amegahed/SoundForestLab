/******************************************************************************\
|                                                                              |
|                         sftp-volume-info-pane-view.js                        |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing information about a volume.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="type form-group">
			<label class="control-label"><i class="fa fa-laptop"></i>Host</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof host != 'undefined') { %><%= host %><% } %>
				</p>
			</div>
		</div>

		<div class="username form-group">
			<label class="control-label"><i class="fa fa-user"></i>Username</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof username != 'undefined') { %><%= username %><% } %>
				</p>
			</div>
		</div>

		<div class="password form-group">
			<label class="control-label"><i class="fa fa-key"></i>Password</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof password != 'undefined') { %><%= password %><% } %>
				</p>
			</div>
		</div>

		<div class="port form-group">
			<label class="control-label"><i class="fa fa-ship"></i>Port</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof port != 'undefined') { %><%= port %><% } %>
				</p>
			</div>
		</div>

		<div class="root form-group">
			<label class="control-label"><i class="fa fa-sitemap"></i>Root</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof root != 'undefined') { %><%= root %><% } %>
				</p>
			</div>
		</div>

		<div class="passive form-group">
			<label class="control-label"><i class="fa fa-play"></i>Passive</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof passive != 'undefined') { %><%= passive %><% } %>
				</p>
			</div>
		</div>

		<div class="ssl form-group">
			<label class="control-label"><i class="fa fa-lock"></i>SSL</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof ssl != 'undefined') { %><%= ssl %><% } %>
				</p>
			</div>
		</div>
	`)
});