var mysql = require('mysql');
function getConnection(){	
	var connection=mysql.createConnection({
		host	 : 'aws-sh-db01.cqsrraflln0o.us-west-1.rds.amazonaws.com',
		user     : 'shadmin',
		password : 'sh!admin!123',
		database : 'WRC',
		port     : '3306'
	});
	return connection;
	}
	
exports.getConnection=getConnection;