<h1><i class="fa fa-list"></i>Configuring the System</h1>

<ol class="breadcrumb">
	<li><a href="#help"><i class="fa fa-question-circle"></i>Help</a></li>
	<li><a href="#help/setting-up"><i class="fa fa-laptop"></i>Setting Up</a></li>
	<li><i class="fa fa-list"></i>Configuring the System</li>
</ol>

<div class="content">
	<p>Next, you will need to configure the software. </p>

	<ol>
		<li>
			<h2><i class="fa fa-laptop"></i>Configure client</h2>
			<p>To configure the client software, go to the configuration folder folder of the web client (the "config" directory inside of your html directory).  You should see a file called "config.sample.json".  Copy this file to "config.json" and open it in your editor. </p>
			<ol>
				<li>
					<h3>Configure server URL</h3>
					<p>Under "servers", set the parameters "authentication" and "web" to the url of your web server followed by "/services/public/api". </p>

					<div class="code well">
	"servers": {
		"authentication": "http://www.mydomain.com/services/public/api",
		"web": "http://www.mydomain.com/services/public/api"
	}
					</div>
				</li>
			</ol>
		</li>

		<li>
			<h2><i class="fa fa-server"></i>Configure server</h2>
			<p>To configure the server software, go to the "services" folder where you copied the web server files.  Inside of this directory your should see a file called ".env.example".  Copy this file to ".env" and open it in your text editor. </p>

			<ol>
				<li>
					<h3>Configure app</h3>
					<ol>
						<li>
							<label>Set environment</label>
							<p>Set the variable "APP_ENV" to "prod". </p>

							<div class="code well">
	APP_ENV=prod
							</div>
						</li>
						<li>
							<label>Set app key</label>
							<p>To set the application key, go to the <%= application.name %> server directory and run the command "php artisan key:generate".  This will fill in the "APP_KEY" parameter with a suitable random value. </p>

							<div class="code well">
	APP_KEY=&lt;a random string of characters&gt;
							</div>
						</li>
						<li>
							<label>Disable debugging Info</label>
							<p>Set the variable "APP_DEBUG" to "false". This will prevent debug messages from being shown in the case of an error. </p>

							<div class="code well">
	APP_DEBUG=false
							</div>
						</li>
						<li>
							<label>Set app URL</label>
							<p>Set the variable "APP_URL" to the url of your <%= application.name %> server.  This will be your domain name followed by "/services". </p>

							<div class="code well">
	APP_URL=http://www.mydomain.com/services
							</div>
						</li>
						<li>
							<label>Set user storage location (optional)</label>
							<p>You can configure where you want your user storage to be located by setting the variable "APP_USER_STORAGE_PATH".  By default, your user files will reside in the directory "storage/app" but you can have the application store user files wherever you want, even on a different disk volume. </p>

							<div class="code well">
	APP_USER_STORAGE_PATH=/user-data
							</div>
						</li>
					</ol>
				</li>

				<li>
					<h3>Configure database</h3>
					<ol>
						<li>
							<label>Set database parameters</label>
							<p>Set the variable "DB_DATABASE" to the name of your database, which is most likely "<%= application.name.toLowerCase() %>". </p>

							<div class="code well">
	DB_DATABASE=<%= application.name.toLowerCase() %>
							</div>
						</li>
						<li>
							<label>Set database username</label>
							<p>Set the variable "DB_USERNAME" to your database username. </p>

							<div class="code well">
	DB_USERNAME=root
							</div>
						</li>
						<li>
							<label>Set database password</label>
							<p>Set the variable "DB_PASSWORD" to your database password. </p>

							<div class="code well">
	DB_PASSWORD=root
							</div>
						</li>
					</ol>
				</li>

				<li>
					<h3>Configure email</h3>
					<p>There are a number of situations where the <%= application.name %> server needs to send emails.  For example, normally it does this to validate user email addresses when registering new users. </p>

					<ol>
						<li>
							<label>Set mail host</label>
							<p>Set the variable "MAIL_HOST" to the host name of your mail server. </p>

							<div class="code well">
	MAIL_HOST=mail.mydomain.com
							</div>
						</li>
						<li>
							<label>Set mail username</label>
							<p>Set the variable "MAIL_USERNAME" to the user to use for sending email messages. </p>

							<div class="code well">
	MAIL_USERNAME=myusername
							</div>
						</li>
						<li>
							<label>Set mail password</label>
							<p>Set the variable "MAIL_PASSWORD" to the password of the user to use for sending email messages. </p>

							<div class="code well">
	MAIL_PASSWORD=mypassword
							</div>
						</li>
					</ol>
				</li>
			</ol>
		</li>
	</ol>
</div>