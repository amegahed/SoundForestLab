/******************************************************************************\
|                                                                              |
|                          chat-message-list-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying a list of chat messages.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import CollectionView from '../../../../../../views/collections/collection-view.js';
import SelectableContainable from '../../../../../../views/behaviors/containers/selectable-containable.js';
import ChatMessageItemView from '../../../../../../views/apps/chat-viewer/mainbar/chats/lists/chat-message-item-view.js';

export default CollectionView.extend(_.extend({}, SelectableContainable, {

	//
	// attributes
	//

	className: 'messages-list',
	childView: ChatMessageItemView,

	//
	// rendering methods
	//
	
	childViewOptions: function() {
		return {

			// options
			//
			preferences: this.options.preferences,
			selected: this.options.selected,
			showElapsedTime: this.options.showElapsedTime,

			// capabilities
			//
			features: this.options.features,
			editable: this.options.editable,

			// callbacks
			//
			onselect: this.options.onselect,
			ondeselect: this.options.ondeselect,
			onopen: this.options.onopen,
			onchange: this.options.onchange
		}; 
	},

	update: function() {

		// update all children
		//
		for (let i = 0; i < this.children.length; i++) {
			let child = this.children.findByIndex(i);
			child.update();
		}
	}
}));