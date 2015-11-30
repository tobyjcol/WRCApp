//var mysql = require('./dbConnectionsController');
//var bcrypt = require('./bCrypt');
var employer = require('../DAO/employer');

function encryptPassword(pwd) {
	//var bcrypt = require('bcryptjs');
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(pwd, salt);	
	return hash;
}

exports.employerList = function(req, res){
	res.render('employerList');
};

exports.employerRegistration = function(req, res){
	res.render('employerRegistration');
};

exports.getEmployers = function(req, res){
	employer.getEmployers(req, res, function(err, result){
		if (!err) {
			console.log("Success!!");
			console.log(res);
			console.log(result);
		} else {
			console.log("Error: " + err);
		}
	});
};

exports.newEmployer = function(req, res) {
	var json = {};
	json.FirstName = req.body.fname;
	json.MiddleName = req.body.mname;
	json.LastName = req.body.lname;
	json.Company = req.body.company;
	json.Address1 = req.body.address1;
	json.Address2 = req.body.address2;
	json.City = req.body.city;
	json.State = req.body.state;
	json.Zip = req.body.zip;
	json.Phone = req.body.phone;
	json.Email = req.body.email;
	json.DriverLicense = req.body.dlid;
	json.EmployerID = "";
	//json.UserName=req.body.userid;
	//json.Password=req.body.password;
	UserName = req.body.userid;
	Password = req.body.password;

	employer.newEmployer(function (err, result) {
		if (!err) {
			console.log("NOTHING.");
			res.render('eHome');
		} else {
			console.log("Error: " + err);
		}
	}, res, json, UserName, Password);
};

//exports.getEmployers = function(json) {
//	if(cookiesHash.id == req.session.id){
//	var connection=mysql.getConnection();
//	var query = connection.query("select * from EmployerInfo ", function(err, rows) {
//		connection.end();
//		if (!err) {
			//res.setHeader('Set-Cookie', req.session.id);
////			res.send({res: rows});
	//	} else {
	//		console.log(err);
	//	}
//	});
//};

/*exports.editEmployer=function(req, res){
	var json = {};
	json.FirstName = req.body.fname;
	json.MiddleName = req.body.mname;
	json.LastName = req.body.lname;
	json.Company = req.body.company;
	json.Address1 = req.body.address1;
	json.Address2 = req.body.address2;
	json.City = req.body.city;
	json.State = req.body.state;
	json.Zip = req.body.zip;
	json.Phone = req.body.phone;
	json.Email = req.body.email;
	json.DriverLicense=req.body.dlid;
	json.EmployerID="";
	employer.editEmployer(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res, json);
};*/


/*exports.deleteEmployer=function(req, res){
	var EmployerID=req.body.EmployerID;
	employer.deleteEmployer(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res, EmployerID);
};*/

/*exports.empRegister = function(callback, json) {
//	if(cookiesHash.id == req.session.id){
		var connection=mysql.getConnection();
		
		var query = connection.query("INSERT INTO connections set ? ", json , function(err, r){
			if (!err) {

				connection.query("select MAX(id) as id from WorkerInfo "), function (err, results) {
					if (!err) {

						connection.query("INSERT INTO UserSkills set ? ", {
							WorkerID: results,
							SkillID: json.SkillID
						}, function (err, rows) {
							if (!err) {
								res.setHeader('Set-Cookie', req.session.id);
								res.send({"msg": "successfully inserted"});
							} else {
								res.error = err;
							}
						});
					} else {
						console.log("Sleep!!!");
					}
				}
			} else {
				res.error = err;
			}
			connection.end();	
		});
	// }else{
};
//	}
}; */

/*exports.employer = function(req, res) {
 console.log("here.");
 res.render('eregister');
 };*/