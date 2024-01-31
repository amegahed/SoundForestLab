/******************************************************************************\
|                                                                              |
|                                 multidoc.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an app with tabs for multiple document views.            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Tabbed from '../../../../../views/apps/common/behaviors/tabbing/tabbed.js';

export default _.extend({}, Tabbed, {

	//
	// querying methods
	//

	isAlreadyOpen: function(item) {
		return this.collection.includes(item);
	},

	isDirty: function() {
		if (this.hasActiveTabView()) {
			return this.getActiveTabView().isDirty();
		}
	},

	hasActiveModel: function() {
		return this.hasActivePaneView() && this.getActivePaneView().model != null;
	},

	//
	// getting methods
	//

	getActiveModel: function() {
		if (this.hasActivePaneView()) {
			return this.getActivePaneView().model;
		}
	},

	getModelAt: function(index) {
		return this.collection.at(index);
	},

	//
	// setting methods
	//

	setDirty: function(dirty) {
		this.getActiveTabView().setDirty(dirty);
	},

	setModel: function(model) {
		this.getActivePaneView().model.set(model.attributes);
	},

	setActiveModel: function(model) {
		let index = this.collection.indexOfValue(model);

		// activate existing tab
		//
		this.getChildView('content').setActiveIndex(index);
	},

	//
	// add / remove methods
	//

	addModel: function(model, options) {
		this.collection.add(model, options);

		// activate new tab
		//
		this.setActiveIndex(this.collection.indexOf(model));
	},

	removeModel: function(model) {
		this.collection.remove(model);
	},

	//
	// opening / closing methods
	//

	openModel: function(model) {

		// check if model is already open
		//
		if (this.isAlreadyOpen(model)) {

			// activate existing tab
			//
			this.setActiveModel(model);

		// open file
		//
		} else {

			// load model
			//
			this.loadModel(model);
		}
	},

	openModels: function(models, options) {
		for (let i = 0; i < models.length; i++) {
			this.openModel(models[i], options);
		}
	},

	openSelected: function() {
		this.openModels(this.getSelectedModels());
	},

	loadModel: function(model, options) {
		this.addModel(model, options);
	},

	//
	// tabbing methods
	//

	closeTab: function(index) {
		if (index == undefined) {
			index = this.getActiveIndex();
		}

		// check if we need to close the model
		//
		if (this.closeModel) {
			this.closeModel(() => {
				this.removeModel(this.getModelAt(index));

				// update tabs
				//
				this.onCloseTab();
			});
		} else {
			this.removeModel(this.getModelAt(index));

			// update tabs
			//
			this.onCloseTab();	
		}
	}
});