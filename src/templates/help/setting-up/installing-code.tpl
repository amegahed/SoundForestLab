<h1><i class="fa fa-code"></i>Installing the Code</h1>

<ol class="breadcrumb">
	<li><a href="#help"><i class="fa fa-question-circle"></i>Help</a></li>
	<li><a href="#help/setting-up"><i class="fa fa-laptop"></i>Setting Up</a></li>
	<li><i class="fa fa-code"></i>Installing the Code</li>
</ol>

<div class="content">
	<p>Once you have a web server set up and ready to use, you can set up <%= application.name %> by performing the following steps:</p>

	<ol>
		<li>
			<h2><i class="fa fa-file"></i>Obtain the Files</h2>
			<p>To install the application, you will need to obtain the following files: </p>
			<ul>
				<li><%= application.name.toLowerCase() %>.zip</li>
			</ul>

			<div class="icon-grid figure">
				<div class="file item">
					<div class="row">
						<div class="icon"><img src="images/icons/files/zip.svg" /></div>
					</div>
					<div class="row">
						<div class="name"><%= application.name.toLowerCase() %>.zip</div>
					</div>
				</div>
			</div>
		</li>

		<li>
			<h2><i class="fa fa-download"></i>Install the Files</h2>
			<p>Once you have the application files, you will need to install them in the right location on your web server. </p>

			<ol>
				<li>
					<h3><i class="fa fa-expand"></i>Extract the files</h3>
					<p>Extract the files contained in the file "<%= application.name.toLowerCase() %>.zip".  When this file is expanded, it should create a folder named "<%= application.name.toLowerCase() %>" which contains a number of sub-folders with names like "scripts", "styles", and "templates". </p>

	<div class="code well">
	unzip sharedigm.zip
	</div>
				</li>
				<li>
					<h3><i class="fa fa-arrow-right"></i>Move the files</h3>
					<p>Move the contents of the "<%= application.name.toLowerCase() %>" folder (not the "<%= application.name.toLowerCase() %>" folder itself) into the "document root" folder on your web server.  On most Unix/Apache systems, the web server folder is usually "/var/www/html".

	<div class="code well">
	mv sharedigm/*.* /var/www/html
	</div>

					<p>Note that the document root may be different on your web server, so you will need to find out this location for your particular type of web server. </p>
				</li>
			</ol>
		</li>

		<li>
			<h3><i class="fa fa-lock"></i>Set storage permissions</h3>
			<p>The application may sometimes have a need to write out temporary files, for example, log files or session files.  It does this in the "services/storage" directory.  Make sure that this directory is writable by your web server.  On a unix system, make sure that the files in the web server folder are owned by the web server process (usually "apache") and set the permissions to make the directory writeable by the web server. </p>

	<div class="code well">
	chown -R apache:apache /var/www/html
	chmod -R 755 /var/www/html/services/storage
	</div>
		</li>
	</ol>
</div>