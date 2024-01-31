/******************************************************************************\
|                                                                              |
|                               item-icon-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a file or directory icon and name.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import IconView from '../../../../../../views/items/icons/icon-view.js';
import Mappable from '../../../../../../views/maps/behaviors/mappable.js';
import ItemBadgesView from '../../../../../../views/apps/file-browser/mainbar/files/badges/item-badges-view.js';
import FileUtils from '../../../../../../utilities/files/file-utils.js';

export default IconView.extend(_.extend({}, Mappable, {

	//
	// attributes
	//

	template: template(`
		<div class="row">
		
			<div class="icon">
				<%= icon %>
				<% if (geo_orientation != undefined) { %>
				<div class="geoorientation marker" style="transform:rotate(<%= Math.round(geo_orientation.heading) %>deg)" data-toggle="tooltip" title="orientation: <%= Math.round(geo_orientation.heading) %> &deg; N">
					<i class="fa fa-location-arrow"></i>
				</div>
				<% } %>
			</div>
			
			<% if (owner) { %>
			<div class="owner small tile" data-toggle="tooltip" data-html="true" title="shared by<br /><%= owner.getName() %>" data-placement="right">
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
			<div class="spinner"></div>
		</div>
		
		<div class="info row">
			<div class="name" spellcheck="false"><%= name %></div>
		</div>
		
		<div class="specifics row">
			<span class="details"><%= details %></span>
		</div>
	`),
	ownerThumbnailSize: 25,

	regions: {
		badges: {
			el: '.badges',
			replaceElement: true
		}
	},

	//
	// querying methods
	//

	isUniqueName: function(name) {
		let item = this.model.collection.directory.getItemNamed(name);
		return !item || item == this.model;
	},
	
	//
	// getting methods
	//

	getName: function() {
		return this.model.getName();
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

	getDetailLevel: function() {
		let detailKind = this.options.preferences? this.options.preferences.get('detail_kind') : undefined;
		if (detailKind) {
			switch (detailKind) {
				case 'size':
					return 2;

				case 'create_date':
				case 'modify_date':
				case 'access_date':
				case 'capture_date': {
					let dateFormat = this.options.preferences? this.options.preferences.get('date_format') : undefined;
					switch (dateFormat) {
						case 'date_only':
						case 'day_date':
						case 'time_only':
							return 2;
						case 'date_time':
						case 'day_date_time':
							return 3;
					}
					break;
				}

				case 'album':
				case 'artist':
				case 'band':
				case 'composer':
					return 3;
			}

			return 1;
		}
	},

	//
	// setting methods
	//

	setName: function(name) {

		// check if name has changed
		//
		if (name != FileUtils.getItemName(this.get('path'))) {
			let path = FileUtils.getDirectoryPath(this.get('path'));

			// rename file
			//
			this.model.moveTo(path? path + name : name, {

				// callbacks
				//
				error: (model, response) => {

					// revert name to previous value
					//
					this.revertName();

					// show error message
					//
					application.error({
						message: "Could not rename this item.",
						response: response
					});
				}
			});
		}
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
			geo_orientation: this.model.getGeoOrientation? this.model.getGeoOrientation() : undefined
		};
	},

	showBadges: function() {
		this.showChildView('badges', new ItemBadgesView({
			model: this.model
		}));	
	},

	//
	// drag and drop event handling methods
	//

	onDropOut: function() {

		// perform callback
		//
		if (this.options.ondropout) {
			this.options.ondropout(this.parent.getSelectedModels());
		}
	}
}));