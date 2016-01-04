var mysql = require('./dbConnectionsController');


exports.getJobs = function getAllJobs(req, res) {	
	/*var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
		var connection=mysql.getConnection();
		var query = connection.query("select * from JobInfo",
				function(err, rows) {			
			if (err) {
				console.log(err);
				//cstmError.mySqlException(err, res);					
				//cstmError.throwException('Something went wrong.',res);
			} else {
				res.setHeader('Set-Cookie', req.session.id);
				res.send({res:rows});
			}
			connection.end();
		});
	/*}*/
};


exports.getJob = function getJobs(req, res) {	
	/*var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){*/
		var jobId = req.params.id;
		var connection=mysql.getConnection();
		var query = connection.query("select * from JobInfo where JobID = "+ jobId,
				function(err, rows) {
			
			if (err) {
				console.log(err);
				//cstmError.mySqlException(err, res);					
				//cstmError.throwException('Something went wrong.',res);
			} else {
				res.setHeader('Set-Cookie', req.session.id);
				res.send({res:rows});
			}
			connection.end();
		});
	/*}else{

	}*/
};


exports.submitJob = function submitJob(req, res) {	
	var cookiesHash = req.cookies;
	if(cookiesHash.id == req.session.id){
		if(req.session.UserName!=null || req.session.UserName!=" "){
			var connection=mysql.getConnection();
			var query = connection.query("Insert into JobInfo SET ? ",jobInfo,	
				function(err, rows) {
				connection.end();
				if (err) {
					console.log(err);
					//cstmError.mySqlException(err, res);					
					//cstmError.throwException('Something went wrong.',res);
				} else {
					res.setHeader('Set-Cookie', req.session.id);
					res.send({res:"Success"});
				}
				conneciton.end();
			});
		}else{
			res.render('/index');
		}
	}else{

	}
		
};


exports.updateJob = function udpateJob(req, res) {	
/*var cookiesHash = req.cookies;	
	if(cookiesHash.id == req.session.id){*/
	var connection=mysql.getConnection();
		var jobInfo={};
		var JobID = req.param('JobID');
		jobInfo.Title = req.param('Title');
		jobInfo.Description = req.param('Description');
		jobInfo.WorkSiteAddress = req.param('WorkSiteAddress');
		jobInfo.StartDate = req.param('StartDate');
		jobInfo.EndDate = req.param('EndDate');
		jobInfo.SkillID = req.param('SkillID');
		jobInfo.NoWorkers = req.param('NoWorkers');
		jobInfo.NoHours = req.param('NoHours');
		jobInfo.PayRate = req.param('PayRate');
		var query = connection.query("Update JobInfo  SET ? where JobID=? ",[jobInfo,JobID],	
				function(err, rows) {
			connection.end();
			if (err) {
				console.log(err);
				//cstmError.mySqlException(err, res);					
				//cstmError.throwException('Something went wrong.',res);
			} else {
				res.send({res:"Success"});
			}
			
		});
	/*}else{
		res.render('/')
	}*/
};

exports.deleteJob = function deleteJob(req, res) {		
		var connection=mysql.getConnection();
		var jobId = req.param('id');
		console.log('jobid'+jobId);
		var query = connection.query("update JobInfo set status='Deleted' where  JobId = " + jobId,	
				function(err, rows) {			
			if (err) {
				console.log(err);
				connection.end();
				//cstmError.mySqlException(err, res);					
				//cstmError.throwException('Something went wrong.',res);
			} else {
				res.send({res:"Success"});
				connection.end();
			}			
		});
};