/******************************************************************************\
|                                                                              |
|                          zoom-mode-buttons-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for a group of related toolbar buttons.         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ButtonGroupView from '../../../../../views/apps/common/toolbars/button-groups/button-group-view.js';
import FitSizeButtonView from '../../../../../views/apps/image-viewer/header-bar/zoom-mode-bar/buttons/fit-size-button-view.js';
import FitWidthButtonView from '../../../../../views/apps/image-viewer/header-bar/zoom-mode-bar/buttons/fit-width-button-view.js';
import FitHeightButtonView from '../../../../../views/apps/image-viewer/header-bar/zoom-mode-bar/buttons/fit-height-button-view.js';
import ActualSizeButtonView from '../../../../../views/apps/image-viewer/header-bar/zoom-mode-bar/buttons/actual-size-button-view.js';

export default ButtonGroupView.extend({

	//
	// attributes
	//

	tools: template(`
		<div class="fit-size" data-toggle="tooltip" title="Fit Size" data-placement="bottom"></div>
		<div class="fit-width" data-toggle="tooltip" title="Fit Width" data-placement="bottom"></div>
		<div class="fit-height" data-toggle="tooltip" title="Fit Height" data-placement="bottom"></div>
		<div class="actual-size" data-toggle="tooltip" title="Actual Size" data-placement="bottom"></div>
	`),

	regions: {
		fit_size: '.fit-size',
		fit_width: '.fit-width',
		fit_height: '.fit-height',
		actual_size: '.actual-size'
	},

	//
	// getting methods
	//

	getValue: function() {
		for (let key in this.regions) {
			if (this.selectedButton == this.getChildView(key)) {
				return key;
			}
		}
	},

	//
	// setting methods
	//

	setValue: function(selected) {
		if (selected) {
			this.getChildView(selected).select();
		} else if (this.selectedButton) {
			this.selectedButton.deselect();
		}
	},

	//
	// zooming methods
	//

	zoomTo: function(zoom) {
		this.parent.parent.getChildView('zoom').zoomTo(zoom);
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ButtonGroupView.prototype.onRender.call(this);

		// show child views
		//
		this.showChildView('fit_size', new FitSizeButtonView({
			model: this.model,
			selected: this.options.selected == 'fit_size'
		}));
		this.showChildView('fit_width', new FitWidthButtonView({
			model: this.model,
			selected: this.options.selected == 'fit_width'
		}));
		this.showChildView('fit_height', new FitHeightButtonView({
			model: this.model,
			selected: this.options.selected == 'fit_height'
		}));
		this.showChildView('actual_size', new ActualSizeButtonView({
			model: this.model,
			selected: this.options.selected == 'actual_size'
		}));
	}
});