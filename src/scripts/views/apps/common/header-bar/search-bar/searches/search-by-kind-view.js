/******************************************************************************\
|                                                                              |
|                              search-by-kind-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for searching files.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SearchByView from '../../../../../../views/apps/common/header-bar/search-bar/searches/search-by-view.js';

export default SearchByView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-file"></i>
			</div>
		
			<input type="search" class="form-control" placeholder="Search by kind">
		
			<div class="close-btn input-group-addon btn">
				<i class="fa fa-xmark"></i>
			</div>
			<div class="search-btn input-group-addon btn">
				<i class="fa fa-search"></i>
			</div>
		</div>
	`),
	key: 'kind'
});