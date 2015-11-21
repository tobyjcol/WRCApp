var mysql = require('./dbConnectionsController');

exports.getWorkers = function(req,res){
		var connection=mysql.getConnection();
		var query = connection.query("select * from WorkerInfo",
				function(err, rows) {
			connection.end();
			if (err) {
				console.log(err);
				//cstmError.mySqlException(err, res);					
				//cstmError.throwException('Something went wrong.',res);
			} else {
				res.send({res:rows});
			}
		});
};

exports.getWorkerDetails = function(WorkerID) {	
		var connection=mysql.getConnection();
		var query = connection.query("select * from WorkerInfo where WorkerID ? ",WorkerID ,
				function(err, rows) {
			connection.end();
			if (err) {
				console.log(err);
				//cstmError.mySqlException(err, res);					
				//cstmError.throwException('Something went wrong.',res);
			} else {
				res.send({res:rows});
			}
		});
};	

exports.newWorker = function (callback, res, json, skID) {	
	var connection=mysql.getConnection();
	
	var query = connection.query("INSERT INTO WorkerInfo set ? ",json, function(err, r){
		if (err) {
			console.log("Error: " + r);		
			connection.end();								
		} 
		else {		
			console.log("Level 1");
			//connection.end();

			var conn = mysql.getConnection();
			conn.query("select MAX(WorkerID) as id from WorkerInfo", function(error, results){
				if(error){
					console.log("Sleep!!! "+error);
					conn.end();	
				}else{
					console.log("Level 2: "+results[0].id);
					conn.query("INSERT INTO UserSkills set ? ", {WorkerID: results[0].id, SkillID: skID} , function(errors, rows){
						if (errors) {
							console.log("sdsd "+ errors);
							conn.end();	
						} 
						else {
							console.log("Level 3 SUCCESS");
							//res.send({"msg":"successfully inserted"});
							res.render('aFirst');
							connection.end();	
						}
					});
				}
			});
		}
	});
};

exports.editWorker = function(callback, json){
	var connection=mysql.getConnection();

	//Change Query.
	var query = connection.query("UPDATE WorkerInfo set ? where WorkerID= ? ",[json,json.WorkerID], function(err, r){
		if (err) {
			console.log("Error: " + r);		
			connection.end();								
		} 
		else {		
			console.log("Level 1");
		}
	});	
};
 
exports.deleteWorker = function(callback, WorkerID){
	var connection=mysql.getConnection();

	//Change Query.
	var query = connection.query("DELETE from WorkerInfo where WorkerID=? ",WorkerID, function(err, r){
		if (err) {
			console.log("Error: " + r);		
			connection.end();								
		} 
		else {		
			console.log("Level 1");
		}
	});	
};