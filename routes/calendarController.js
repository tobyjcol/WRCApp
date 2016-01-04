var worker = require('../DAO/worker');
var employer=require('../DAO/employer');
var calendar=require('../DAO/calendar');

exports.getJobDescription=function(req,res){	
	var cookiesHash = req.cookies;
	/*if(cookiesHash.id == req.session.id){*/
	var id=req.param("jobid");
//	console.log("in: "+id);
	calendar.getJobDescription(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res,id);
/*  }
  else{
		res.send("Not Authorized!!");		
	}*/
};

exports.getCalendarView=function(req,res){
	
	/*var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
	calendar.getCalendarView(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},req,res);
 /* }
  else{
		res.send("Not Authorized!!");		
	}*/
};

exports.showCalendar = function(req, res){
	/*var cookiesHash = req.cookies;
	console.log(cookiesHash.id);*/
	/*if(cookiesHash.id == req.session.id){*/
	res.render('calendar');	
	/*}
	else{
		res.render('/');			
	}	*/
};
exports.renderEvents=function(req,res){
	/*var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
	//console.log(req.param("id"));
	var date=parseInt(req.param("id"));
	var d=new Date(date);
//	console.log(d);
	calendar.getJobs(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res,d);
/*}
else{
	res.render('/');			
}*/
};

exports.getDetailsToAssign=	function(req,res){
/*	var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
	//console.log(req.param("jobid"));
	var jobId=parseInt(req.param("jobid"));	
	calendar.getDetailsToAssign(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res,jobId);
/*}
	else{
		res.send("Not Authorized!!");		
	}*/
};

exports.assignJob=function(req,res){
	/*var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
	//console.log(req.param("id"));
	var jobId=parseInt(req.param("jobid"));	
	var workersList=JSON.parse(req.param("workers"));
	//console.log(workersList);
	calendar.assignJob(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res,jobId,workersList);
/*}
	else{
		res.send("Not Authorized!!");			
	}*/
};

exports.getAssignedWorkers=	function(req,res){	
	/*var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
	var jobId=parseInt(req.param("jobid"));	
	calendar.getAssignedWorkers(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res,jobId);
	/*}
	else{
		res.send("Not Authorized!!");			
	}*/
};

exports.editJobAssignment=function(req,res){
	
	/*var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
	//console.log(req.param("id"));
	var jobId=parseInt(req.param("jobid"));	
	var workersList=JSON.parse(req.param("workers"));
	var status=req.param("status");
	calendar.editJobAssignment(function(err, result){
		if(err){
			console.log("Error: "+err);
		}else{
			console.log("NOTHING.");
		}
	},res,jobId,workersList,status);
	/*}
	else{
		res.send("Not Authorized!!");			
	}*/
};
