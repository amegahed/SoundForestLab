/******************************************************************************\
|                                                                              |
|                             place-cards-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a grid of map place cards.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import CardsView from '../../../../../../views/items/cards/cards-view.js';
import ContainableMappable from '../../../../../../views/maps/behaviors/containable-mappable.js';
import PlaceCardView from '../../../../../../views/apps/map-viewer/mainbar/places/cards/place-card-view.js';

export default CardsView.extend(_.extend({}, ContainableMappable, {

	//
	// attributes
	//

	childView: PlaceCardView,
	editable: false
}));