/******************************************************************************\
|                                                                              |
|                               favorites-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing a favorites view.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Directory from '../../../../../models/files/directory.js';
import FileFavorites from '../../../../../models/favorites/file-favorites.js';
import EditableFilesView from '../../../../../views/apps/file-browser/mainbar/files/editable-files-view.js';

export default EditableFilesView.extend({

	//
	// constructor
	//

	initialize: function(options) {

		// call superclass method
		//
		EditableFilesView.prototype.initialize.call(this, options);

		// set optional parameter defaults
		//
		if (!this.options.favorites) {
			this.options.favorites = new FileFavorites();
		}

		// initialize model
		//
		this.collection = this.model.toItems();
		this.model = new Directory({
			contents: this.collection.toArray()
		});
	},

	//
	// getting methods
	//

	getPaths: function() {
		let paths = [];
		for (let i = 0; i < this.collection.length; i++) {
			paths.push(this.collection.at(i).get('path'));
		}
		return paths;
	},

	//
	// adding methods
	//

	addFavorites: function(items, options) {

		// add items to collection
		//
		for (let i = 0; i < items.length; i++) {
			this.collection.add(items[i]);
		}

		// update
		//
		this.saveFavorites(options);
	},

	removeFavorites: function(items, options) {

		// check if we need to confirm
		//
		if (!options || options.confirm != false) {

			// confirm remove
			//
			application.confirm({
				title: "Remove from Favorites",
				message: "Are you sure you want to delete " + 
					(items.length == 1? '"' + items[0].getName() + '"' : "these " + items.length + " items") +
					" from your list of favorites?",

				// callbacks
				//
				accept: () => {
					this.removeFavorites(items, _.extend({}, options, {
						confirm: false
					}));
				}
			});
		} else {

			// remove items from collection
			//
			for (let i = 0; i < items.length; i++) {
				this.collection.remove(items[i]);
			}

			// play remove sound
			//
			application.play('remove');

			// update
			//
			this.saveFavorites({

				// callbacks
				//
				success: (model) => {
					if (options && options.success) {
						options.success(model);
					}
				},

				error: (model, response) => {
					if (options && options.error) {
						options.error(model, response);
					}
				}
			});
		}
	},

	saveFavorites: function(options) {

		// update model
		//
		this.options.favorites.setPaths(this.getPaths());

		// save model
		//
		if (application.isSignedIn()) {
			this.options.favorites.save(undefined, options);
		}
	},

	//
	// event handling methods
	//

	onChange: function() {

		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange();
		}
	},

	//
	// selection event handling methods
	//

	onSelect: function(item) {

		// perform callback
		//
		if (this.options.onselect) {
			this.options.onselect(item);
		}
	},

	//
	// file event handling methods
	//

	onOpen: function(item) {
		this.getParentView('file-browser').openItem(item.model, {

			// callbacks
			//
			// success: () => this.deselectAll()
		});
	},

	//
	// drag and drop event handling methods
	//

	onDropOn: function(items) {

		// add items to favorites
		//
		this.addFavorites(items, {

			// callbacks
			//
			success: () => {

				// play move sound
				//
				application.play('move');
			}
		});
	},

	//
	// window event handling methods
	//

	onResize: function() {
		this.reflow();
	}
});