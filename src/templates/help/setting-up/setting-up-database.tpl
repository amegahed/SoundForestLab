<h1><i class="fa fa-database"></i>Setting Up the Database</h1>

<ol class="breadcrumb">
	<li><a href="#help"><i class="fa fa-question-circle"></i>Help</a></li>
	<li><a href="#help/setting-up"><i class="fa fa-laptop"></i>Setting Up</a></li>
	<li><i class="fa fa-database"></i>Setting Up the Database</li>
</ol>

<div class="content">
	<p><%= application.name %> uses a standard SQL database.  You can use any of a number of SQL databases including MySQL, MariaDB, and others.  To set up your <%= application.name %> database, perform the following steps:</p>

	<ol>
		<li>
			<h2><i class="fa fa-file"></i>Obtain the Files</h2>
			<p>To set up the database, you will need to obtain the following files from <%= application.name %>: </p>
			<ul>
				<li><%= application.name.toLowerCase() %>.sql</li>
				<li><%= application.name.toLowerCase() %>-initialize.sql</li>
			</ul>

			<div class="icon-grid figure">
				<div class="file item">
					<div class="row">
						<div class="icon"><img src="images/icons/files/sql.svg" /></div>
					</div>
					<div class="row">
						<div class="name"><%= application.name.toLowerCase() %>.sql</div>
					</div>
				</div>

				<div class="file item">
					<div class="row">
						<div class="icon"><img src="images/icons/files/sql.svg" /></div>
					</div>
					<div class="row">
						<div class="name"><%= application.name.toLowerCase() %>-initialize.sql</div>
					</div>
				</div>
			</div>
		</li>

		<li>
			<h2><i class="fa fa-database"></i>Create New Database</h2>
			<p>Using a database editor of your choice, create a new database named "<%= application.name.toLowerCase() %>".
		</li>

		<li>
			<h2><i class="fa fa-table"></i>Create Database Tables</h2>
			<p>Next, create the tables used by <%= application.name %>.  To do this, open your new "<%= application.name.toLowerCase() %>" database and execute the SQL script contained in "<%= application.name.toLowerCase() %>.sql". </p>

			<div class="icon-grid figure">
				<div class="file item">
					<div class="row">
						<div class="icon"><img src="images/icons/files/sql.svg" /></div>
					</div>
					<div class="row">
						<div class="name"><%= application.name.toLowerCase() %>.sql</div>
					</div>
				</div>
			</div>
		</li>
		
		<li>
			<h2><i class="fa fa-list"></i>Create Database Entries</h2>
			<p>Last, you will need to fill the database with an administrator account and some additional information (country data etc.) used by the application.  To do this, open the "<%= application.name.toLowerCase() %>" database and execute the SQL script contained in "<%= application.name.toLowerCase() %>-initialize.sql". </p>

			<div class="icon-grid figure">
				<div class="file item">
					<div class="row">
						<div class="icon"><img src="images/icons/files/sql.svg" /></div>
					</div>
					<div class="row">
						<div class="name"><%= application.name.toLowerCase() %>-initialize.sql</div>
					</div>
				</div>
			</div>
		</li>
	</ol>
</div>