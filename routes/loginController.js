var mysql = require('./dbConnectionsController');

exports.adminLogin = function(req, res){
	var connection=mysql.getConnection();
	var query = connection.query("Select * from LoginInfo where UserName = ? and Password=? ",[req.body.UserName, req.body.Password] , function(err, result){
		if (!err) {
			if ((result[0].UserName == req.body.UserName) && (result[0].Password == req.body.UserName)) {
				//req.session.UserName = login[0].UserName;
				if (result[0].RolesID == "1") {
					console.log("Reached Here. 1");
					res.render('aFirst');
				} else if (result[0].RolesID == "2") {
					console.log("Reached Here. 2");
					res.render('eHome');
				} else {
					console.log("Reached Here. 3");
					res.render('');
				}
			}
			else {
				console.log("Reached Here. 4");
				res.render('');  //Change the URL.
			}
		} else {
			console.log("Error: " + err);
			connection.end();
		}
	});
}