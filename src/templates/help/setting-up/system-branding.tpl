<h1><i class="fa fa-paint-brush"></i>Branding and Customization</h1>

<ol class="breadcrumb">
	<li><a href="#help"><i class="fa fa-question-circle"></i>Help</a></li>
	<li><a href="#help/setting-up"><i class="fa fa-laptop"></i>Settings Up</a></li>
	<li><i class="fa fa-paint-brush"></i>Branding and Customization</li>
</ol>

<div class="content">
	<p><%= application.name %> offers the ability to customize your own instance with your own aesthetics and branding.</p>

	<ol>
		<li>
			<h2><i class="fa fa-file"></i>Open Branding Configuration File</h2>
			<p>The branding and customization is controlled by a JSON file located in the "config" folder.  Open up "branding.json" in your text editor of choice. This is where the branding for your website is defined. </p>
		</li>

		<li>
			<h2><i class="fa fa-eye"></i>Review Branding Sample Configuration File</h2>
			<p>The complete set of branding features that are available for you to use are defined in the file "branding.sample.json". This file is intended as a template and is not used by the application.  You can use this file to copy and paste configuration code into your "branding.json" file. </p>
		</li>

		<li>
			<h2><i class="fa fa-font"></i>Set Title</h2>
			<p>First, set the "title" parameter.  This controls the title that appears in your users' web browser tabs when they visit your website. </p>

			<div class="code well">
	"title": "<%= application.name %>"
			</div>
		</li>

		<li>
			<h2><i class="fa fa-image"></i>Set Logo</h2>
			<p>Set the "logo" parameter.  This controls the logo that appears in the center of the main welcome page that users first see when they visit your website. Note that there are also parameters available to set the tooltip and href link if you'd like this logo to function as a hyperlink. </p>

			<div class="code well">
	"logo": {
		"src": "images/logos/zigzag.svg",
		"href": "#users/amegahed",
		"tooltip": "Click for more info"
	}
			</div>
		</li>

		<li>
			<h2><i class="fa fa-quote-left"></i>Set Name</h2>
			<p>Set the "name" parameter.  Note that you can specify a "first", a "middle", and a "last" name.  If you only want to specify a single name (for example, for a company or organization), then you can specify the first name only or the first and last names only. Note that for each name component, you can also specify a font and a color. </p>

			<div class="code well">
	"name": {
		"first": {
			"text": "Share",
			"font": "Syncopate",
			"color": ""
		},
		"middle": {
			"text": "",
			"font": "",
			"color": ""
		},
		"last": {
			"text": "digm",
			"font": "Syncopate",
			"color": ""
		}
	}
			</div>
		</li>

		<li>
			<h2><i class="fa fa-quote-left"></i>Set Tagline</h2>
			<p>Set the "tagline" parameter. A tagline is a succinct, catchy description of your website, company, or product. This will appear underneath your name on the main page. </p>

			<div class="code well">
	"tagline": {
		"text": "&lt;Your Tagline Here&gt;",
		"font": "Syncopate",
		"color": ""
	}
			</div>
		</li>

		<li>
			<h2><i class="fa fa-quote-left"></i>Set Description</h2>
			<p>Set the "description" parameter.  The description should be a short description of what your website, company, or product does. This will appear underneath the tagline on the main page. </p>

			<div class="code well">
	"description": {
		"text": "Cloud based file sharing, operating system, and social network.",
		"font": "",
		"color": ""
	}
			</div>
		</li>

		<li>
			<h2><i class="fa fa-file"></i>Set Page Style</h2>
			<p>You can use the "page" parameter to set the styling used on the main page of your website. Typically, this might be a color associated with your brand or a very light or very dark background color.  You can also set a "theme" which determines colors used for the page content and headings.  The "theme" parameter may have the values "standard", "light", or "dark". </p>

			<div class="code well">
	"page":{
		"background": "",
		"theme": "",
		"font": ""
	}
			</div>
		</li>

		<li>
			<h2><i class="fa fa-caret-up"></i>Set Header</h2>
			<p>You can set various aspects of the header that appears at the top of the window. </p>

			<div class="code well">
	"header": {
		"background": "",
		"color": "",
		"logo": "images/logos/zigzag.svg",

		"signin": {
			"background": "",
			"font": "",
			"color": ""
		},
		"signup": {
			"background": "",
			"font": "",
			"color": ""
		}
	}
			</div>
		</li>

		<li>
			<h2><i class="fa fa-image"></i>Set Crawler</h2>
			<p>You can also create a custom "crawler" that displays a scrolling set of images behind the name and logo on the main page. For the "images" parameter, you can either specify a list of images as an array or you can specify an associative array where the keys will be displayed as titles beneath each image. </p>

			<div class="code well">
	"crawler": {
		"scale": 1.5,
		"rotation": 30,
		"fov": 100,
		"step": 5,
		"time_step": 50,
		
		"overlay": {
			"far_color": "rgba(16, 16, 16, 1)",
			"near_color": "rgba(16, 32, 127, 0.5)"
		},

		"images": {
			"Title1": "images/crawler/image1.png",
			"Title2": "images/crawler/image2.png",
			"Title3": "images/crawler/image3.png"
		}
	}
			</div>
		</li>

		<li>
			<h2><i class="fa fa-caret-down"></i>Set Footer</h2>
			<p>Lastly, you can control the footer displayed at the bottom of each page. </p>

			<div class="code well">
	"footer": {
		"background": "",
		"font": "",
		"color": "",
		"copyright": {
			"year": "2021",
			"entity": "<%= application.name %>"
		}
	}
			</div>
		</li>
	</ol>
</div>