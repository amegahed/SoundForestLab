/******************************************************************************\
|                                                                              |
|                            s3-volume-form-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a form for inputing file volume information.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="key form-group">
			<label class="required control-label"><i class="fa fa-key"></i>Key</label>
			<div class="controls">
				<div class="input-group">
					<input type="text" class="required form-control" value="<%= key %>" />
					<div class="input-group-addon">
						<i class="active fa fa-question-circle" data-toggle="popover" title="Key" data-content="This is the key that identifies your volume."></i>
					</div>
				</div>
			</div>
		</div>
		
		<div class="secret form-group">
			<label class="required control-label"><i class="fa fa-user-secret"></i>Secret</label>
			<div class="controls">
				<div class="input-group">
					<input type="text" class="required form-control" value="<%= secret %>" />
					<div class="input-group-addon">
						<i class="active fa fa-question-circle" data-toggle="popover" title="Secret" data-content="This is the secret that acts as a passkey to your volume."></i>
					</div>
				</div>
			</div>
		</div>
		
		<div class="region form-group">
			<label class="required control-label"><i class="fa fa-globe-americas"></i>Region</label>
			<div class="controls">
				<div class="input-group">
					<input type="text" class="required form-control" value="<%= region %>" />
					<div class="input-group-addon">
						<i class="active fa fa-question-circle" data-toggle="popover" title="Region" data-content="This is the region where your volume is hosted."></i>
					</div>
				</div>
			</div>
		</div>
		
		<div class="bucket form-group">
			<label class="required control-label"><i class="fa fa-archive"></i>Bucket</label>
			<div class="controls">
				<div class="input-group">
					<input type="text" class="required form-control" value="<%= bucket %>" />
					<div class="input-group-addon">
						<i class="active fa fa-question-circle" data-toggle="popover" title="Bucket" data-content="This is the bucket containing your volume."></i>
					</div>
				</div>
			</div>
		</div>
	`),

	//
	// form querying methods
	//

	getValue: function(key) {
		switch (key) {
			case 'key':
				return this.$el.find('.key input').val();
			case 'secret':
				return this.$el.find('.secret input').val();
			case 'region':
				return this.$el.find('.region input').val();
			case 'bucket':
				return this.$el.find('.bucket input').val();
		}
	},

	getValues: function() {
		return {
			key: this.getValue('key'),
			secret: this.getValue('secret'),
			region: this.getValue('region'),
			bucket: this.getValue('bucket')
		};
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			key: undefined,
			secret: undefined,
			region: undefined,
			bucket: undefined
		};
	}
});
