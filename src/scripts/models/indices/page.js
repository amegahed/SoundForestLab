/******************************************************************************\
|                                                                              |
|                                   page.js                                    |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a recursive directory structure.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseModel from '../../models/base-model.js';

export default BaseModel.extend({

	//
	// attributes
	//

	defaults: {
		icon: '<i class="fa fa-file"></i>',
		name: 'Page',
		url: undefined
	}
});