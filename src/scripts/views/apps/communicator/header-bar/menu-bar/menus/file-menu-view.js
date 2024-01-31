/******************************************************************************\
|                                                                              |
|                               file-menu-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying file dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FileMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/file-menu-view.js';

export default FileMenuView.extend({

	//
	// attributes
	//

	template: template(`
		<li role="presentation">
			<a class="new-window"><i class="far fa-window-maximize"></i>New Window<span class="command shortcut">enter</span></a>
		</li>

		<li role="presentation">
			<a class="new-topic"><i class="fa fa-hashtag"></i>New Topic<span class="shift command shortcut">enter</span></a>
		</li>
		
		<li role="presentation">
			<a class="new-chat"><i class="fa fa-comments"></i>New Chat<span class="shift command shortcut">enter</span></a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="open-topics"><i class="fa fa-folder"></i>Open Topics<span class=" command shortcut">O</span></a>
		</li>
		
		<li role="presentation">
			<a class="open-chats"><i class="fa fa-folder"></i>Open Chats<span class=" command shortcut">O</span></a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="show-info"><i class="fa fa-info-circle"></i>Show Info<span class="command shortcut">I</span></a>
		</li>
		
		<li role="presentation">
			<a class="download-item"><i class="fa fa-download"></i>Download<span class="shift command shortcut">D</span></a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="add-topics"><i class="fa fa-plus"></i>Add Topics<span class="command shortcut">D</span></a>
		</li>
		
		<li role="presentation">
			<a class="remove-topics"><i class="fa fa-minus"></i>Remove Topics<span class="shortcut">delete</span></a>
		</li>
		
		<li role="presentation" class="hidden">
			<a class="end-chat"><i class="fa fa-minus"></i>End Chat<span class="shortcut">delete</span></a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="close-tab"><i class="fa fa-xmark"></i>Close Tab<span class=" command shortcut">L</span></a>
		</li>
		
		<% if (!is_desktop) { %>
		<li role="presentation">
			<a class="close-window"><i class="fa fa-circle-xmark"></i>Close<span class="command shortcut">L</span></a>
		</li>
		<% } %>
	`),

	events: {
		'click .new-window': 'onClickNewWindow',
		'click .new-topic': 'onClickNewTopic',
		'click .new-chat': 'onClickNewChat',
		'click .open-topics': 'onClickOpenTopics',
		'click .open-chats': 'onClickOpenChats',
		'click .add-topics': 'onClickAddTopics',
		'click .remove-topics': 'onClickRemoveTopics',
		'click .end-chat': 'onClickEndChat',
		'click .show-info': 'onClickShowInfo',
		'click .download-item': 'onClickDownloadItem',
		'click .close-tab': 'onClickCloseTab',
		'click .close-window': 'onClickCloseWindow'
	},

	//
	// querying methods
	//

	visible: function() {
		let isSignedIn = application.isSignedIn();
		let hasSelectedOpenTopic = this.parent.app.hasSelectedOpenTopic();
		let hasSelectedOpenPost = this.parent.app.hasSelectedOpenPost();
		let hasSelectedOpenChat = this.parent.app.hasSelectedOpenChat();
		let hasSelectedOpenTab = hasSelectedOpenTopic || hasSelectedOpenPost || hasSelectedOpenChat;

		return {
			'new-window': true,
			'new-topic': isSignedIn,
			'new-chat': isSignedIn,
			'open-topics': isSignedIn,
			'open-chats': isSignedIn,
			'add-topics': isSignedIn,
			'remove-topics': isSignedIn,
			'end-chat': isSignedIn && hasSelectedOpenChat,
			'show-info': true,
			'download-item': true,
			'close-chat': hasSelectedOpenTab,
			'close-window': true
		};
	},

	enabled: function() {
		let isSignedIn = application.isSignedIn();
		let hasOpenItem = this.parent.app.hasOpenItem();
		let hasSelected = this.parent.app.hasSelected();
		let isChat = this.parent.app.hasSelectedOpenChat();
		let hasSelectedTopic = this.parent.app.hasSelectedTopic();
		let hasSelectedPost = this.parent.app.hasSelectedPost();
		let selectedTopic = this.parent.app.getSelectedTopics()[0];
		let isTopicRequired = selectedTopic && selectedTopic.isRequired();
		let isTopicOwned = selectedTopic && selectedTopic.isOwnedBy(application.session.user);
		let hasSelectedItem = this.parent.app.hasSelectedFileItem();
		let hasMultiple = this.parent.app.hasOpenItems();

		return {
			'new-window': true,
			'new-topic': isSignedIn,
			'new-chat': isSignedIn,
			'open-topics': isSignedIn,
			'open-chats': isSignedIn,
			'add-topics': isSignedIn,
			'remove-topics': isSignedIn && hasSelectedTopic && !hasSelectedItem && !hasSelectedPost && !isTopicOwned && !isTopicRequired,
			'end-chat': isChat && !hasSelected,
			'show-info': hasOpenItem,
			'download-item': hasSelectedItem,
			'close-tab': hasMultiple,
			'close-window': true
		};
	},

	//
	// setting methods
	//

	setTopic: function(topic) {
		this.setItemDisabled('remove-topic', topic.isRequired() || 
			topic.isOwnedBy(application.session.user));
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			is_desktop: this.parent.app.isDesktop()
		};
	},

	//
	// selection event handling methods
	//

	onSelect: function() {
		this.onChange();
	},

	onDeselect: function() {
		this.onChange();
	},

	//
	// mouse event handling methods
	//

	onClickNewTopic: function() {
		this.parent.app.showNewTopicDialog();
	},

	onClickNewChat: function() {
		this.parent.app.showChatInvitationsDialog();
	},

	onClickOpenTopics: function() {
		this.parent.app.openSelectedTopics();
	},

	onClickOpenChats: function() {
		this.parent.app.openSelectedChats();
	},

	onClickAddTopics: function() {
		this.parent.app.showAddTopicsDialog();
	},

	onClickRemoveTopics: function() {
		this.parent.app.removeSelectedTopics();
	},

	onClickEndChat: function() {
		this.parent.app.endSelectedChat();
	},

	onClickShowInfo: function() {
		this.parent.app.showInfoDialog();
	},

	onClickDownloadItem: function() {
		this.parent.app.download();
	},

	onClickCloseTab: function() {
		this.parent.app.closeActiveTab();
	}
});