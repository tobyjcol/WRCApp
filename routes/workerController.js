var worker = require('../DAO/worker');

exports.homepage = function(req, res){
	res.render('index');
};

exports.workerRegister = function(req, res){
	res.render('workerRegistration');
};

exports.workerList = function(req, res){
	res.render('workerList');
};

exports.eLogin = function(req, res){
	res.render('eLogin');
};

exports.newWorker = function(req, res){
	json = {};
	skills = {};
	json.FirstName = req.body.FirstName;
	json.MiddleName = req.body.MiddleName;
	json.LastName = req.body.LastName;
	json.DOB = req.body.DOB;	
	json.SSN = req.body.SSN;
	json.Address1 = req.body.Address1;
	json.Address2 = req.body.Address2;
	json.City = req.body.City;
	json.State = req.body.State;
	json.Zip = req.body.Zip;
	json.Phone = req.body.Phone;
	json.Email = req.body.Email;
	json.Ethnicity = req.body.Ethnicity;
	json.JobSeeker = req.body.JobSeeker;
	json.WorkerStatus = req.body.WorkerStatus;
	json.Skill_1 = req.body.Skill_1;
	json.Skill_2 = req.body.Skill_2;
	json.Skill_3 = req.body.Skill_3;

	worker.newWorker(function(err, result){
		if (!err) {

		} else {
			console.log("Error: " + err);
			console.log(result);
		}
	},res, json, skills);
};

exports.aHome = function(req, res){
	res.render('aHome');
};

exports.getWorker = function(req,res){
	if(req.body.WorkerID!= null){
		worker.getWorkerDetails(function(err, result){
			if(err){
				console.log("Error: "+ err);
			}else{
				console.log("Success!!");
				res.render('someWebPage');
			}
		},req.body.WorkerID);
	}else{
		res.send("Invalid WorkerID.")
	}
};

exports.getDashboard = function(req,res){
	res.render("dashboard");
};

exports.getWorkers = function(req, res){
	worker.getWorkers(req, res, function(err, result){
		if (!err) {
			console.log("Success!!");
			console.log(res);
		} else {
			console.log("Error: " + err);
		}
	});
};
