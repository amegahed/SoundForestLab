/******************************************************************************\
|                                                                              |
|                               sidebar-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an app's sidebar.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SideBarView from '../../../../views/apps/common/sidebar/sidebar-view.js';
import TopicInfoPanelView from '../../../../views/apps/topic-viewer/sidebar/panels/topic-info-panel-view.js';
import TopicsPanelView from '../../../../views/apps/topic-viewer/sidebar/panels/topics-panel-view.js';

export default SideBarView.extend({

	//
	// attributes
	//

	panels: ['topic_info', 'topics'],

	//
	// attribute methods
	//

	enabled: function() {
		let isSignedIn = application.isSignedIn();

		return {
			'topic_info': isSignedIn,
			'topics': isSignedIn
		};
	},

	//
	// setting methods
	//

	setTopic: function(topic) {

		// set attributes
		//
		this.model = topic;

		// update child views
		//
		if (this.isPanelVisible('topic_info')) {
			this.showPanel('topic_info');
		}

		// set selected
		//
		// this.getChildView('topics').setSelectedModel(topic);

		// scroll into view
		//
		// this.scrollToView(this.findByModel(topic));
	},

	setSelected: function(model, options) {
		this.getChildView('topics').setSelectedModel(model, options);

		// scroll into view
		//
		this.scrollToView(this.getTopic()[0]);
	},

	//
	// panel rendering methods
	//

	showPanel: function(panel) {

		// show specified panel
		//
		switch (panel) {
			case 'topic_info':
				this.showTopicInfoPanel();
				break;
			case 'topics':
				this.showTopicsPanel();
				break;
		}
	},

	showTopicInfoPanel: function() {
		this.showChildView('topic_info', new TopicInfoPanelView({
			model: this.model,

			// options
			//
			view_kind: this.options.view_kind
		}));		
	},

	showTopicsPanel: function() {
		this.showChildView('topics', new TopicsPanelView({
			post: this.options.post,
			defaultTopic: this.app.getDefaultTopic(),
			collection: this.collection,

			// options
			//
			view_kind: this.options.view_kind,

			// callbacks
			//
			onload: (model) => this.onLoad(model),
			onselect: this.options.onselect,
			ondeselect: this.options.ondeselect,
			onopen: this.options.onopen,
			ondrop: this.options.ondrop
		}));		
	},

	onLoad: function(model) {
		this.model = model;
		this.showTopicInfoPanel();
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {

		// abort request
		//
		if (this.request && this.request.state() == 'pending') {
			this.request.abort();
		}
	}
});