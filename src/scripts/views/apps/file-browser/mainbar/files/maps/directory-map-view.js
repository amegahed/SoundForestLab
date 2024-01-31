/******************************************************************************\
|                                                                              |
|                             directory-map-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a grid of file & directory icons.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Items from '../../../../../../collections/files/items.js';
import ItemsMapView from '../../../../../../views/maps/items-map-view.js';
import GeolocatableFilesView from '../../../../../../views/maps/items/geolocatable-files-view.js';

export default ItemsMapView.extend({

	//
	// rendering methods
	//

	getItemsLayerView: function() {
		return new GeolocatableFilesView({
			collection: this.collection,

			// options
			//
			preferences: this.options.preferences,
			view_kind: this.options.preferences.get('map_view_kind'),
			tile_size: this.options.tile_size,
			selected: this.options.selected,

			// filter options
			//
			viewFilter: (view) => view.model.hasGeolocation && view.model.hasGeolocation(),

			// event handlers
			//
			onselect: (item) => this.onSelect(item),
			ondeselect: (item) => this.onDeselect(item),
			onopen: (item) => this.onOpen(item),
			ondropout: (items) => this.onDropOut(items),
			onadd: () => this.placeOn(this.getChildView('map'))
		});
	},

	//
	// dialog rendering methods
	//

	showMapViewer: function() {
		application.launch('map_viewer', {
			place: this.getPlace(),
			photos: this.collection.filter(Items.filters.is_geolocated),
			map_mode: this.map.mode
		}, {
			new_window: true
		});
	}
});