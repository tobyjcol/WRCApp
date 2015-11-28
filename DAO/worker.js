var mysql = require('./dbConnectionsController');

exports.getWorkers = function(req,res){
		var connection=mysql.getConnection();
		var query = connection.query("select * from WorkerInfo",
				function(err, rows) {
			connection.end();
					if (!err) {
						res.send({res: rows});
					} else {
						console.log(err);
						//cstmError.mySqlException(err, res);
						//cstmError.throwException('Something went wrong.',res);
					}
				});
};

exports.getWorkerDetails = function(WorkerID) {
		var connection=mysql.getConnection();
		var query = connection.query("select * from WorkerInfo where WorkerID ? ",WorkerID , function(err, rows) {
			connection.end();
			if (!err) {
				res.send({res: rows});
			} else {
				console.log(err);
				//cstmError.mySqlException(err, res);
				//cstmError.throwException('Something went wrong.',res);
			}
		});
};

exports.newWorker = function (callback, res, json) {
	var connection=mysql.getConnection();

	var query = connection.query("INSERT INTO WorkerInfo set ? ",json, function(err, r){
		if (!err) {
			console.log(res);
			//TODO: Make this redirect to to the right place.
			//res.redirect('/wRegister');
			res.render('aFirst');
			connection.end();

		} else {
			console.log("Error: " + r);
			connection.end();
		}
	});
};

exports.editWorker = function(callback, json){
	var connection=mysql.getConnection();
	//Change Query.
	var query = connection.query("UPDATE WorkerInfo set ? where WorkerID= ? ",[json,json.WorkerID], function(err, r){
		if (!err) {
			console.log("Level 1");
		} else {
			console.log("Error: " + r);
			connection.end();
		}
	});
};

exports.deleteWorker = function(callback, WorkerID){
	var connection=mysql.getConnection();
	//Change Query.
	var query = connection.query("DELETE from WorkerInfo where WorkerID= ? ",WorkerID, function(err, r){
		if (!err) {
			console.log("Level 1");
		} else {
			console.log("Error: " + r);
			connection.end();
		}
	});
};