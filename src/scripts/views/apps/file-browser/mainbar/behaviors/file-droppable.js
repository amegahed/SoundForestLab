/******************************************************************************\
|                                                                              |
|                              file-droppable.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a drag and drop behavior for drop targets.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ItemDroppable from '../../../../../views/behaviors/drag-and-drop/item-droppable.js';

export default _.extend({}, ItemDroppable, {

	//
	// drag event handling methods
	//

	onDragEnter: function(event) {
		if (this.droppable != false) {
			this.highlight();
		}

		// prevent default drag behavior
		//
		this.block(event);
	},

	onDragOver: function(event) {
		if (this.droppable != false) {
			this.highlight();
		}

		// prevent default drag behavior
		//
		this.block(event);
	},

	onDragLeave: function(event) {
		if (this.droppable != false) {
			this.unhighlight();
		}

		// prevent default drag behavior
		//
		this.block(event);
	},

	//
	// drop event handling methods
	//

	onDrop: function(event) {			
		if (this.droppable != false) {
			if (!this.containsFiles(event)) {
					
				// drop dropped on items
				//
				ItemDroppable.onDrop.call(this);
			} else {

				// drop dragged in items
				//
				this.onDropIn(event);
			}
		}

		// prevent default drop behavior
		//
		event.preventDefault();
	},

	onDropIn: function(event) {
		let dataTransfer = event.originalEvent.dataTransfer;

		// upload dropped items
		//
		if (dataTransfer.items) {
			this.onDropInItems(dataTransfer.items);
		} else {
			this.onDropInFiles(dataTransfer.files);
		}
	},

	//
	// file drop event handling methods
	//

	onDropInItems: function(items) {

		// perform callback
		//
		if (this.options.ondropinitems) {
			this.options.ondropinitems(items, this);
		}	
	},

	onDropInFiles: function(files) {
		
		// perform callback
		//
		if (this.options.ondropinfiles) {
			this.options.ondropinfiles(files, this);
		}	
	}
});