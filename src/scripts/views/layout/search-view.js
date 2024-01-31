/******************************************************************************\
|                                                                              |
|                                search-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for displaying search results.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Post from '../../models/topics/post.js';
import Posts from '../../collections/topics/posts.js';
import BaseView from '../../views/base-view.js';
import Openable from '../../views/apps/common/behaviors/launching/openable.js';
import DirectoryListView from '../../views/apps/file-browser/mainbar/files/lists/directory-list-view.js';
import PostsListView from '../../views/apps/topic-viewer/mainbar/topics/posts/posts-list-view.js';

export default BaseView.extend(_.extend({}, Openable, {

	//
	// attributes
	//

	tagName: 'search',

	template: template(`
		<h1><i class="fa fa-search"></i>Search Results</h1>
		
		<div class="message well">
			Searching for "<%= search %>" ...
		</div>

		<div class="files" style="display:none">
			<h2><i class="fa fa-file"></i>Files</h2>
			<div class="well">
				<span class="num-items" style="margin-right:10px"></span>
				<span>Double-click a file to open.</span>
			</div>
			<div class="list"></div>
		</div>

		<div class="posts" style="display:none">
			<h2><i class="fa-hashtag"></i>Posts</h2>
			<div class="well">
				<span class="num-posts" style="margin-right:10px"></span>
			</div>
			<div class="list"></div>
		</div>

		<br />

		<div class="buttons">
			<button class="search btn btn-lg">
				<i class="fa fa-repeat"></i>Search Again
			</button>
		</div>

		<% if (config.defaults.search.credits) { %>
		<br />

		<div class="credits well" style="display:none">
			<% if (config.defaults.search.credits.text) { %>
			<div style="margin-bottom: 10px"><%= config.defaults.search.credits.text %></div>
			<% } %>

			<% if (config.defaults.search.credits.list) { %>
			<ul>
			<% for (let i = 0; i < config.defaults.search.credits.list.length; i++) { %>
				<li><%= config.defaults.search.credits.list[i] %></li>
			<% } %>
			</ul>
			<% } %>
		</div>
		<% } %>
	`),

	regions: {
		files: '.files .list',
		posts: '.posts .list'
	},

	events: {
		'click .search.btn': 'onClickSearch'
	},

	//
	// constructor
	//

	initialize: function() {

		// set attributes
		//
		this.model = application.getDirectory(config.defaults.search.directory);
		this.collection = new Posts();
	},

	//
	// searching methods
	//

	fetchAndShowFiles: function(options) {
		this.model.load({
			search: {
				name: this.options.search
			},
			recursive: true,

			// callbacks
			//
			success: () => {
				if (this.model.contents.length > 0) {

					// show search results
					//
					this.showFiles(this.model.contents);
				} else {

					// perform callback
					//
					if (options && options.error) {
						options.error();
					}
				}
			}
		});
	},

	fetchAndShowPosts: function(options) {
		this.collection.fetchPublic({
			data: {
				message: this.options.search
			},

			// callbacks
			//
			success: () => {
				if (this.collection.length > 0) {

					// show search results
					//
					this.showPosts(this.collection);
				} else {

					// perform callback
					//
					if (options && options.error) {
						options.error();
					}
				}
			}
		});
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			search: decodeURI(this.options.search),
			branding: config.branding
		};
	},

	onAttach: function() {

		// search
		//
		this.fetchAndShowFiles({

			// callbacks
			//
			error: () => {
				this.fetchAndShowPosts({

					// callbacks
					//
					error: () => {
						this.showMessage("No results were found.");
					}
				});
			}
		});
	},

	showMessage: function(message) {
		this.$el.find('.message').text(message);
		this.$el.find('.message').show();
	},

	hideMessage: function() {
		this.$el.find('.message').hide();
	},

	showFiles: function(files) {
		this.showChildView('files', new DirectoryListView({
			collection: files,

			// capabilities
			//
			editable: false,

			// callbacks
			//
			onopen: (item) => this.onOpen(item)
		}));

		// show files info
		//
		this.$el.find('.files').show();
		this.showNumFiles(files.length);
		this.$el.find('.credits').show();
	},

	showNumFiles: function(numFiles) {
		this.$el.find('.files .well .num-items').text(numFiles + " items were found.");
	},

	showPosts: function(posts) {
		this.showChildView('posts', new PostsListView({
			collection: posts,

			// capabilities
			//
			selectable: false,
			editable: false,

			// callbacks
			//
			onopen: (item) => this.onOpen(item)
		}));

		// show posts info
		//
		this.$el.find('.posts').show();
		this.showNumPosts(posts.length);
	},

	showNumPosts: function(numFiles) {
		this.$el.find('.posts .well .num-posts').text(numFiles + " posts were found.");
	},

	//
	// event handling methods
	//

	onOpen: function(item) {
		if (item.model instanceof Post) {
			application.showPost(item.model);
		} else {
			this.openItem(item.model);
		}
	},

	//
	// mouse event handling methods
	//

	onClickSearch: function() {

		// go to welcome view
		//
		application.navigate('#', {
			trigger: true
		});
	}
}));