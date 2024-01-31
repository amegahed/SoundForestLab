/******************************************************************************\
|                                                                              |
|                                 file-leaf-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a file within a directory tree.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import LeafView from '../../../../../../views/items/trees/leaf-view.js';
import DirectoryTreeViewable from '../../../../../../views/apps/file-browser/mainbar/files/trees/directory-tree-viewable.js';
import ItemBadgesView from '../../../../../../views/apps/file-browser/mainbar/files/badges/item-badges-view.js';
import FileUtils from '../../../../../../utilities/files/file-utils.js';

export default LeafView.extend(_.extend({}, DirectoryTreeViewable, {

	//
	// attributes
	//

	template: template(`
		<div class="info">
			
			<div class="icon">
				<i class="fa fa-spinner"></i>
				<%= icon %>
			</div>
			
			<div class="name" spellcheck="false"><%= name %></div>
			
			<div class="specifics">
		
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
				
				<div class="badges"></div>
				<div class="details"><%= details %></div>
			</div>
		</div>
	`),

	//
	// constructor
	//

	initialize: function() {

		// set attributes
		//
		if (this.editable && this.options.editable != undefined) {
			this.editable = this.options.editable;
		}
		this.parent = this.options.parent;
	},
	
	//
	// attribute methods
	//

	className: function() {
		let name = '';
		let extension = this.model.getFileExtension().toLowerCase();

		// add system tag
		//
		if (this.isHidden()) {
			name += 'system';
		}

		// add extension
		//
		if (extension != '') {
			if (name != '') {
				name += ' ';
			}
			name += extension;
		} 

		// add 'file item'
		//
		if (name != '') {
			name += ' ';
		}
		name += 'file item';

		return name;
	},

	//
	// querying methods
	//

	hasThumbnail: function() {
		return (!this.options.preferences || this.options.preferences.get('show_thumbnails')) && this.model.hasThumbnail();
	},

	canShowThumbnail: function() {
		let size = this.get('size');
		if (size != undefined) {
			let maxSize = config.apps.file_browser.max_thumbnail_file_size;
			
			if (this.model.getFileExtension() == 'svg') {
				let maxSvgSize = config.apps.file_browser.max_thumbnail_svg_file_size;
				if (size > maxSvgSize) {
					return false;
				}
			}

			return size < maxSize;
		}
	},
	
	//
	// getting methods
	//

	getName: function() {
		if (this.options.preferences.get('show_file_extensions')) {
			return this.model.getName();
		} else {
			return this.model.getBaseName();	
		}
	},

	getThumbnailUrl: function() {
		return this.model.getThumbnailUrl({
			max_size: Math.floor(this.thumbnailSize * (window.devicePixelRatio || 1))
		});
	},
	
	getThumbnail: function() {
		if (this.model.getFileExtension().toLowerCase() == 'svg') {
			return '<img class="thumbnail svg" src="' + this.model.getUrl() + '" />';
		} else if (this.model.has('resolution')) {
			let resolution = this.model.get('resolution');
			let width = resolution[0] < resolution[1]? resolution[0] / resolution[1] * this.thumbnailSize : this.thumbnailSize;
			let height = resolution[1] < resolution[0]? resolution[1] / resolution[0] * this.thumbnailSize : this.thumbnailSize;
			return '<div class="thumbnail photo" style="background:url(' + this.getThumbnailUrl() + 
				'); width:' + width + 'px; height:' + height + 'px"></div>';
		} else {
			return '<img class="thumbnail photo" src="' + this.getThumbnailUrl() + '" />';			
		}
	},

	getIconName: function() {
		let name = this.model.getName().toLowerCase();

		if (config.files.files.names[name]) {

			// get icon by file name
			//
			return config.files.files.names[name].icon;
		} else {

			// get icon by file extension
			//
			let extension = this.model.getFileExtension().toLowerCase();

			// get icon
			//
			if (config.files.files.extensions[extension]) {
				return config.files.files.extensions[extension].icon;
			} else {
				return config.files.files.icon;
			}
		}
	},

	getIconUrl: function() {
		return config.servers.images + '/' + this.constructor.getIconPath() + '/' + this.getIconName();
	},

	getIcon: function() {
		if (this.hasThumbnail() && this.canShowThumbnail() != false) {

			// get thumbnail icon
			//
			return this.getThumbnail();
		} else {

			// get icon
			//
			return this.constructor.getIcon(this.model.getName().toLowerCase());
		}
	},

	getOwnerThumbnailUrl: function() {
		if (this.model.has('owner')) {
			let owner = this.model.get('owner');
			return owner.hasProfilePhoto()? owner.getProfilePhotoUrl({
				min_size: Math.floor(this.ownerThumbnailSize * (window.devicePixelRatio || 1))
			}) : undefined;		
		}
		return false;
	},
	
	//
	// setting methods
	//

	setName: function(name) {

		// append extension if hiding extensions
		//
		if (!this.options.preferences.get('show_file_extensions')) {
			let extension = this.model.getFileExtension();
			if (extension) {
				name = name + '.' + extension;
			}
		}

		// call superclass method
		//
		DirectoryTreeViewable.setName.call(this, name);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: this.getIcon(),
			name: this.getName(),
			owner: this.get('owner'),
			owner_thumbnail_url: this.getOwnerThumbnailUrl(),
			details: this.getDetails(),
			geo_orientation: this.model.hasGeoOrientation? this.model.getGeoOrientation() : undefined
		};
	},

	showBadges: function() {
		this.showChildView('badges', new ItemBadgesView({
			model: this.model
		}));
	}
}), {

	//
	// static methods
	//

	getIcon: function(name) {
		let className;

		if (config.files.files.names[name]) {
			className = config.files.files.names[name].font;
		} else {
			let extension = FileUtils.getFileExtension(name);
			if (config.files.files.extensions[extension]) {
				className = config.files.files.extensions[extension].font;
			} else {
				className = config.files.files.font;
			}
		}

		return '<i class="' + className + '"></i>';
	}
});