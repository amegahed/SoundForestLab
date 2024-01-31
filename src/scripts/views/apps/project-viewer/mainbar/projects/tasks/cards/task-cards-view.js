/******************************************************************************\
|                                                                              |
|                              task-cards-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a grid of project task cards.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import CardsView from '../../../../../../../views/items/cards/cards-view.js';
import TaskCardView from '../../../../../../../views/apps/project-viewer/mainbar/projects/tasks/cards/task-card-view.js';

export default CardsView.extend({

	//
	// attributes
	//

	childView: TaskCardView,
	editable: false
});