/******************************************************************************\
|                                                                              |
|                               view-menu-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying view dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ViewMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/view-menu-view.js';

export default ViewMenuView.extend({

	//
	// attributes
	//

	template: template(`
		<li role="presentation" type="detail-kind" style="display:none">
			<a class="view-profile"><i class="fa fa-check"></i><i class="fa fa-user"></i>Profile</a>
		</li>
		
		<li role="presentation" type="detail-kind" style="display:none">
			<a class="view-posts"><i class="fa fa-check"></i><i class="fa fa-newspaper"></i>Posts</a>
		</li>
		
		<li role="presentation" type="detail-kind" style="display:none">
			<a class="view-connections"><i class="fa fa-check"></i><i class="fa fa-user-friends"></i>Connections</a>
		</li>
		
		<% if (is_current) { %>
		<li role="presentation" type="detail-kind" style="display:none">
			<a class="view-sharing"><i class="fa fa-check"></i><i class="fa fa-share"></i>Sharing</a>
		</li>
		
		<li role="presentation" type="detail-kind" style="display:none">
			<a class="view-account"><i class="fa fa-check"></i><i class="fa fa-id-card"></i>Account</a>
		</li>
		<% } %>
		
		<li role="separator" class="mobile-only divider"></li>
		
		<li role="presentation" class="hidden-xs dropdown dropdown-submenu">
			<a class="show-sidebar dropdown-toggle"><i class="fa fa-check"></i><i class="fa fa-pause"></i>Sidebar<i class="fa fa-caret-left"></i><i class="fa fa-caret-right"></i></a>
		
			<ul class="show-sidebar-panels dropdown-menu" data-toggle="dropdown">
		
				<li role="presentation">
					<a class="show-activity-panel"><i class="fa fa-check"></i><i class="fa fa-table"></i>Activity</a>
				</li>
		
				<li role="presentation">
					<a class="show-status-panel"><i class="fa fa-check"></i><i class="fa fa-signal"></i>Status</a>
				</li>
		
				<li role="presentation">
					<a class="show-actions-panel"><i class="fa fa-check"></i><i class="fa fa-play-circle"></i>Actions</a>
				</li>
				
				<li role="presentation">
					<a class="show-mutual-connections-panel"><i class="fa fa-check"></i><i class="fa fa-user-friends"></i>Mutual Connections</a>
				</li>
			</ul>
		</li>
		
		<li role="presentation" class="dropdown dropdown-submenu">
			<a class="dropdown-toggle"><i class="fa fa-check"></i><i class="fa fa-th"></i>Sidebar Items<i class="fa fa-caret-left"></i><i class="fa fa-caret-right"></i></a>
		
			<ul class="dropdown-menu" data-toggle="dropdown">
		
				<li role="presentation" class="sidebar-view-kind">
					<a class="view-sidebar-icons"><i class="fa fa-check"></i><i class="fa fa-th"></i>Icons</a>
				</li>
		
				<li role="presentation" class="sidebar-view-kind">
					<a class="view-sidebar-lists"><i class="fa fa-check"></i><i class="fa fa-list"></i>Lists</a>
				</li>
		
				<li role="presentation" class="sidebar-view-kind">
					<a class="view-sidebar-cards"><i class="fa fa-check"></i><i class="fa fa-id-card"></i>Cards</a>
				</li>
		
				<li role="presentation" class="sidebar-view-kind">
					<a class="view-sidebar-tiles"><i class="fa fa-check"></i><i class="fa fa-th-large"></i>Tiles</a>
				</li>
			</ul>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation" class="mobile-only">
			<a class="expand-window"><i class="fa fa-expand"></i>Expand</a>
		</li>
		
		<li role="presentation" class="windowed-app-only window-size dropdown dropdown-submenu">
			<a class="dropdown-toggle"><i class="far fa-window-maximize"></i>Window Size<i class="fa fa-caret-left"></i><i class="fa fa-caret-right"></i></a>
		
			<ul class="dropdown-menu" data-toggle="dropdown">
		
				<li role="presentation">
					<a class="shrink-window"><i class="fa fa-minus"></i>Shrink<span class="command shortcut">[</span></a>
				</li>
		
				<li role="presentation">
					<a class="grow-window"><i class="fa fa-plus"></i>Grow<span class="command shortcut">]</span></a>
				</li>
		
				<li role="presentation">
					<a class="expand-window"><i class="fa fa-expand"></i>Expand<span class="command shortcut">\\</span></a>
				</li>
			</ul>
		</li>
		
		<li role="presentation" class="desktop-app-only spaces dropdown dropdown-submenu">
			<a class="dropdown-toggle"><i class="fa fa-check"></i><i class="far fa-window-maximize"></i>Spaces<i class="fa fa-caret-left"></i><i class="fa fa-caret-right"></i></a>
		
			<ul class="dropdown-menu" data-toggle="dropdown">
		
				<li role="presentation">
					<a class="prev-space"><i class="fa fa-chevron-left"></i>Prev<span class="command shortcut">left arrow</span></a>
				</li>
		
				<li role="presentation">
					<a class="next-space"><i class="fa fa-chevron-right"></i>Next<span class="command shortcut">right arrow</span></a>
				</li>
		
			</ul>
		</li>
		
		<li role="presentation" class="desktop-app-only">
			<a class="view-full-screen"><i class="fa fa-check full-screen-visible"></i><i class="fa fa-desktop"></i>Full Screen<span class="command shortcut">\\</span></a>
		</li>
		
		<% if (application.session.user) { %>
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="view-preferences"><i class="fa fa-snowflake"></i>Preferences</a>
		</li>
		<% } %>
	`),

	events: {

		// view options
		//
		'click li[type="detail-kind"]': 'onClickDetailKind',

		// sidebar options
		//
		'click .show-sidebar': 'onClickOption',
		'click .show-sidebar-panels a': 'onClickShowSideBarPanel',
		'click .sidebar-view-kind a': 'onClickSideBarViewKind',

		// window options
		//
		'click .shrink-window': 'onClickShrinkWindow',
		'click .grow-window': 'onClickGrowWindow',
		'click .expand-window': 'onClickExpandWindow',
		'click .prev-space': 'onClickPrevSpace',
		'click .next-space': 'onClickNextSpace',
		'click .view-full-screen': 'onClickViewFullScreen',

		// preferences options
		//
		'click .view-preferences': 'onClickViewPreferences'
	},

	//
	// querying methods
	//

	enabled: function() {
		return {
			'show-mutual-connections-panel': !this.parent.app.model.isCurrent()
		};
	},

	selected: function() {
		let preferences = this.parent.parent.app.preferences;
		let detailKind = preferences.get('detail_kind');
		let sidebarPanels = preferences.get('sidebar_panels') || [];
		let sidebarViewKind = preferences.get('sidebar_view_kind');

		return {

			// detail options
			//
			'view-profile': detailKind == 'profile',
			'view-posts': detailKind == 'posts',
			'view-connections': detailKind == 'connections',
			'view-sharing': detailKind == 'sharing',

			// sidebar options
			//
			'show-sidebar': preferences.get('show_sidebar'),
			'show-activity-panel': sidebarPanels.includes('activity'),
			'show-status-panel': sidebarPanels.includes('status'),
			'show-actions-panel': sidebarPanels.includes('actions'),
			'show-mutual-connections-panel': sidebarPanels.includes('mutual_connections'),

			// sidebar item options
			//
			'view-sidebar-icons': sidebarViewKind == 'icons',
			'view-sidebar-lists': sidebarViewKind == 'lists',
			'view-sidebar-cards': sidebarViewKind == 'cards',
			'view-sidebar-tiles': sidebarViewKind == 'tiles'
		};
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			is_current: this.parent.parent.app.model.isCurrent()
		};
	}
});