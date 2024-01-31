/******************************************************************************\
|                                                                              |
|                            directory-item-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a directory within a directory list.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FileDroppable from '../../../../../../views/apps/file-browser/mainbar/behaviors/file-droppable.js';
import DirectoryListItemView from '../../../../../../views/apps/file-browser/mainbar/files/lists/directory-list-item-view.js';

export default DirectoryListItemView.extend(_.extend({}, FileDroppable, {

	//
	// attributes
	//

	template: template(`
		<div class="info">
		
			<div class="icon">
				<%= icon %>
			</div>
			
			<div class="name" spellcheck="false"><%= name %></div>
			
			<div class="specifics">
				<div class="badges"></div>

				<% if (owner) { %>
				<div class="owner small tile" data-toggle="tooltip" data-html="true" title="shared by <%= owner.getName() %>">
					<% if (owner.hasProfilePhoto()) { %>
					<div class="thumbnail" style="background-image:url(<%= owner_thumbnail_url %>)">
						<img style="display:none" src="<%= owner_thumbnail_url %>" onerror="this.classList.add('lost')" />
						<i class="placeholder far fa-user"></i>
					</div>
					<% } else { %>
					<div class="thumbnail">
						<i class="fa fa-user"></i>
					</div>
					<% } %>
				</div>
				<% } %>

				<div class="details"><%= details %></div>
			</div>
		</div>
	`),

	events: _.extend({}, DirectoryListItemView.prototype.events, FileDroppable.events),

	//
	// attribute methods
	//

	className: function() {
		let name = '';

		switch (this.get('path')) {
			case '/':
				name = 'home';
				break;
			case '.Clipboard/':
				name = 'clipboard';
				break;
			case 'Trash/':
				name = 'trash';
				break;
		}

		// add 'system'
		//
		if (this.isHidden()) {
			if (name != '') {
				name += ' ';
			}
			name += 'system';
		}

		// add 'directory item'
		//
		if (name != '') {
			name += ' ';
		}
		name += 'directory item';

		return name;
	},

	//
	// getting methods
	//

	getName: function() {
		return this.model.getName() || 'Home';
	},
	
	getIcon: function() {
		let name = this.model.getName().toTitleCase();
		let icons = config.files.folders.names[name];
		let className;

		if (icons) {

			// use for custom icon
			//
			if (typeof icons.font == 'string') {
				className = icons.font;
			} else {

				// select empty or full icon
				//
				if (this.model.isEmpty()) {
					className = icons.font[0];
				} else {
					className = icons.font[1];
				}
			}
		} else {

			// use standard icons
			//
			if (this.model.isEmpty()) {
				className = config.files.folders.font[0];
			} else if (this.model.isAudioAlbum()) {
				className = config.files.folders.albums.audio.font;
			} else if (this.model.isImageAlbum()) {
				className = config.files.folders.albums.image.font;
			} else if (this.model.isVideoAlbum()) {
				className = config.files.folders.albums.video.font;
			} else {
				className = config.files.folders.font[1];
			}
		}

		return '<i class="' + className + '"></i>';
	},

	//
	// drag and drop event handling methods
	//

	onDropOn: function(items) {

		// handle parent's drop on child callback
		//
		if (this.hasParentView('items') && this.getParentView('items').onDropOnChild) {
			this.getParentView('items').onDropOnChild(items, this, {

				// callbacks
				//
				success: () => this.unhighlight()
			});
		} else {
			this.unhighlight();
		}
	}
}));