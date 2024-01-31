/******************************************************************************\
|                                                                              |
|                            activity-panel-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing a type of sidebar panel.         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'activity panel',

	template: template(`
		<div class="header">
			<label><i class="fa fa-chart-bar"></i>Activity</label>
		</div>
		
		<ul class="nav list">
			<li class="num-connections">
				<label><i class="fa fa-user-friends"></i></label>Connections
				<span class="active badge"><%= num_connections %></span>
			</li>
		
			<li class="num-posts">
				<label><i class="fa fa-newspaper"></i></label>Posts
				<span class="active badge"><%= num_posts %></span>
			</li>
		
			<li class="num-comments">
				<label><i class="fa fa-reply"></i></label>Comments
				<span class="active badge"><%= num_comments %></span>
			</li>
		
			<li class="num-chats">
				<label><i class="fa fa-comments"></i></label>Chats
				<span class="active badge"><%= num_chats %></span>
			</li>
		</ul>
	`),

	events: {
		'click .num-connections .badge': 'onClickNumConnections',
		'click .num-posts .badge': 'onClickNumPosts',
		'click .num-comments .badge': 'onClickNumComments',
		'click .num-chats .badge': 'onClickNumChats'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			num_connections: this.model.get('num_connections') || 0,
			num_posts: this.model.get('num_posts') || 0,
			num_comments: this.model.get('num_comments') || 0,
			num_chats: this.model.get('num_chats') || 0
		};
	},

	showDefaultTopic: function() {
		import(
			'../../../../../views/apps/topic-viewer/topic-viewer-view.js'
		).then((TopicViewerView) => {

			// show default topic
			//
			application.showTopic(TopicViewerView.default.default_topic);
		});
	},

	//
	// mouse event handling methods
	//

	onClickNumConnections: function() {
		application.launch('connection_manager');
	},

	onClickNumPosts: function() {
		this.showDefaultTopic();
	},

	onClickNumComments: function() {
		this.showDefaultTopic();
	},

	onClickNumChats: function() {
		this.showDefaultTopic();
	}
});