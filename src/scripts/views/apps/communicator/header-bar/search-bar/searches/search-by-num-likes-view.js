/******************************************************************************\
|                                                                              |
|                          search-by-num-likes-view.js                         |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for searching posts by num likes.            |
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

	className: 'search by-num-likes form-inline',

	template: template(`
		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-thumbs-up"></i>
			</div>
		
			<div class="input-group-addon select">
				<select>
					<option value="num_likes_greater_than">&gt;</option>
					<option value="num_likes">=</option>
					<option value="num_likes_less_than">&lt;</option>
				</select>
			</div>
		
			<input type="number" class="spinnable form-control" value="<%= value %>" placeholder="Search by Likes" min="0">
		
			<div class="close-btn input-group-addon btn">
				<i class="fa fa-xmark"></i>
			</div>
			<div class="search-btn input-group-addon btn">
				<i class="fa fa-search"></i>
			</div>
		</div>
	`),
	focusable: 'input[type="number"]',

	//
	// getting methods
	//

	getKey: function() {
		return this.$el.find('select').val();
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			kind: this.options.kind,
			value: this.options.value
		};
	}
});