var mysql = require('./dbConnectionsController');
//var bcrypt = require('./bCrypt');

exports.getEmployers = function(req,res){
	var connection=mysql.getConnection();
	var query = connection.query("select * from EmployerInfo",
			function(err, rows) {
				connection.end();
				if (!err) {
					res.send({res: rows});
				} else {
					console.log(err);
				}
			});
};



//exports.deleteEmployer = function(callback, EmployerID){
//	var connection=mysql.getConnection();
	//Change Query.
//	var query = connection.query("DELETE from EmployerInfo where EmployerID=? ",EmployerID, function(err, r){
//		if (err) {
//			console.log("Error: " + r);
//			connection.end();
//		}
//		else {
//			connection.end();
//		}
//	});
//};

//exports.newEmployer = function (callback, res, json,UserName,Password) {
//	var connection=mysql.getConnection();
	//var encpassword=encryptPassword(Password);
//	var query = connection.query("INSERT INTO LoginInfo set ? ",{UserName:UserName,Password:Password,RolesID:2}, function(err, r){
//		if (!err) {
//			//console.log("Level 1");			//connection.end();
//			var conn = mysql.getConnection();
//			conn.query("select MAX(UserId) as id from LoginInfo", function (error, results) {
//				if (!error) {
//					json.EmployerID = results[0].id;
//					var query = connection.query("INSERT INTO EmployerInfo set ? ", json, function (err, r) {
//						if (!err) {
//							callback(null, true);
//							connection.end();
//						} else {
//							console.log("Error: " + r);
//							connection.end();
//						}
//					});
//				} else {
//					console.log("Sleep!!! " + error);
//					conn.end();
//				}
//			});
//		} else {
//			console.log("Error: " + r);
//			connection.end();
//		}
//	});
//};

//exports.editEmployer = function(callback, json){
//	var connection=mysql.getConnection();
//	//Change Query.
//	var query = connection.query("UPDATE EmployerInfo set ? where EmployerID= ? ",[json,json.EmployerID], function(err, r){
//		if (err) {
//			console.log("Error: " + r);
//			connection.end();
//		}
//		else {
//			console.log("Level 1");
//		}
//	});
//};