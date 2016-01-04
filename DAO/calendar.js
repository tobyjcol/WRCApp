var mysql = require('./dbConnectionsController');

exports.getCalendarView = function(callback,req,res){	
	var startDate=req.param('start');
	var endDate=req.param('end');		
	var connection=mysql.getConnection();
	var query = connection.query("select sum(jobscount) as title,JobDate as start,sum(NewCount)" +
			" as NewCount from (SELECT count(*) as jobscount,StartDate as JobDate,0 NewCount " +
			"from JobInfo  where StartDate between Date(?) and Date(?) and Status<>'Deleted'" +
			" group by Date(StartDate) union SELECT 0 jobscount, StartDate ,count(*) as NewCount" +
			" from JobInfo where StartDate between Date(?) and Date(?) and Status<>'Deleted'" +
			" and status='New' group by StartDate )k group by Date(JobDate)",[startDate,endDate,startDate,endDate],function(err,data){
		if (err) {
			console.log("Error: " + err);		
			connection.end();								
		} 
		else {	
			console.log("data:"+data);
			connection.end();	
			res.send(data);
		}
	});
};

exports.getJobs=function(callback,res,d){	
	var startDate=new Date(new Date(d).toLocaleDateString());
	var mm = startDate.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
   var dd = startDate.getDate();
   dd = (dd < 10) ? '0' + dd : dd ;
   var yyyy = startDate.getFullYear();
   var date = mm + '/' + dd + '/' + yyyy;
   console.log(date);
	var connection=mysql.getConnection();
	var query = connection.query("SELECT concat(FirstName,' ',LastName) as EmployerName,Title,Company,WorkSiteAddress as address,Phone as contact,status, jobID FROM JobInfo ji " +
								"inner join employerinfo empinfo on ji.EmployerID=empinfo.EmployerID " +
								"where DATE_FORMAT(StartDate,'%m/%d/%Y') =? and Status<>'Deleted' order by status Desc",date,function(err,jobs){
		if (err) {
			console.log("Error: " + err);		
			connection.end();								
		} 
		else {		
			console.log(jobs);
			connection.end();	
			res.render('jobsView',{"jobs":jobs});
		}
	});	
};
exports.getJobDescription=function(callback,res,id){		
	var connection=mysql.getConnection();
	var query =  connection.query("select ji.JobID,ji.Title,ji.Description,ji.WorkSiteAddress,ji.StartDate,ji.EndDate," +
			"ji.SkillID as skillrequired,sl.SkillType as skillName,ji.Status," +
			"ji.NoWorkers,ji.NoHours,ji.PayRate,ji.EmployerComments,ji.EmployerRating,ji.WorkerComments," +
			"ji.WorkerRating,concat(ei.FirstName,' ',ei.LastName) as fullName," +
			"ei.Company,ei.Address1,ei.Address2,ei.City,ei.State,ei.Zip," +
			"ei.Phone as employerContact,ei.Email,ei.DriverLicense from jobinfo ji " +
			"inner join employerinfo ei on ji.EmployerID=ei.EmployerID "+
			"inner join skillslist sl on ji.SkillID=sl.SkillID "+
			"where ji.JobID=?",id,function(err,jobdetails){
		if (err) {
			console.log("Error: " + err);		
			connection.end();									
		} 
		else {		
			res.send({"jobdetails":jobdetails});
		}
	});
	
	
};

exports.assignJob=function(callback,res,jobId,workersList){	
	var rows=[];
	for(x in workersList)
	{
		rows.push([0,workersList[x],jobId,new Date()]);
	}
	var connection=mysql.getConnection();	
	var query = connection.query("Insert into jobassignment (JobAsignmentID,WorkerID,JobID,AssignedDate) values ?"
			,[rows],function(err,result){
		if (err) {
			console.log("Error1: " + err);		
			connection.end();	
			return;
		} 
		else {	
			console.log("result:"+result);			
			var query = connection.query("Update JobInfo  SET Status='Assigned' where JobID=? "
					,jobId,function(err,result){
				if (err) {
					console.log("Error2: " + err);		
					connection.end();								
				} 
				else {		
					connection.end();					
					res.send({res:"Success"});
				}
			});				
		}
	});	
};
	
exports.getDetailsToAssign=function(callback,res,jobId){		

	var connection=mysql.getConnection();
	var jobDetails,skilledWorkers,otherWorkers;	
	var query =  connection.query("select ji.JobID,ji.Title,ji.Description,ji.WorkSiteAddress,ji.StartDate,ji.EndDate," +
			"ji.SkillID as skillrequired,sl.SkillType as skillName,ji.Status," +
			"ji.NoWorkers,ji.NoHours,ji.PayRate,ji.EmployerComments,ji.EmployerRating,ji.WorkerComments," +
			"ji.WorkerRating,concat(ei.FirstName,' ',ei.LastName) as fullName," +
			"ei.Company,ei.Address1,ei.Address2,ei.City,ei.State,ei.Zip," +
			"ei.Phone as employerContact,ei.Email,ei.DriverLicense from jobinfo ji " +
			"inner join employerinfo ei on ji.EmployerID=ei.EmployerID "+
			"inner join skillslist sl on ji.SkillID=sl.SkillID "+
			"where ji.JobID=?",jobId,function(err,jobdetails){
		if (err) {
			console.log("Error: " + err);		
			connection.end();										
		} 
		else {					
				jobDetails=jobdetails;
				var query =  connection.query("select wi.WorkerID," +
						"concat(wi.FirstName,' ',wi.LastName,' ('," +
						"case when wi.Skill_1 is null then '' else concat(wi.Skill_1,',') end," +
						" case when wi.Skill_2 is null then '' else concat(wi.Skill_2,',') end," +
						" case when wi.Skill_3 is null then '' else concat(wi.Skill_3,',') end," +
						" ')',' - ',wi.Phone)  as FullName from workerinfo wi where wi.WorkerStatus='Active' && (" +
						"wi.Skill_1=(select sl.SkillType  from jobinfo ji " +
						"inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) || " +
						"wi.Skill_2=(select sl.SkillType  from jobinfo ji " +
						"inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) || " +
						"wi.Skill_3=(select sl.SkillType  from jobinfo ji " +
						"inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?))",			
						[jobId,jobId,jobId],function(err,skilledworkers){
					if (err) {
						console.log(err);								
					} 
					else {	
							skilledWorkers=skilledworkers;
							var query =  connection.query("select wi.WorkerID," +
									"	concat(wi.FirstName,' ',wi.LastName,' ('," +
									"	 case when wi.Skill_1 is null then '' else concat(wi.Skill_1,',') end," +
									"	 case when wi.Skill_2 is null then '' else concat(wi.Skill_2,',') end," +
									"	 case when wi.Skill_3 is null then '' else concat(wi.Skill_3,',') end," +
									"	')',' - ',wi.Phone) as FullName from workerinfo wi where wi.WorkerStatus='Active' && wi.WorkerID not in " +
									"	( " +
									"	select wi.WorkerID from workerinfo wi where " +
									"	wi.Skill_1=(select sl.SkillType  from jobinfo ji" +
									" inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) || " +
									"	wi.Skill_2=(select sl.SkillType  from jobinfo ji " +
									" inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) ||" +
									" wi.Skill_3=(select sl.SkillType  from jobinfo ji" +
									" inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?)	)",			
									[jobId,jobId,jobId],function(err,otherWorkers){
								if (err) {
									return err;										
								} 
								else {		
									
									res.send({"jobDetails":jobDetails,"skilledWorkers":skilledWorkers,"otherWorkers":otherWorkers});
								}
							});					
					}
				});					
		}
	});	
};

exports.getAssignedWorkers=function(callback,res,jobId){		
	var connection=mysql.getConnection();
	var query = connection.query("select WorkerID from jobassignment where JobID=?",jobId,function(err,workers){
				if (err) {
						console.log("Error: " + err);		
						connection.end();								
					} 
					else {		
						connection.end();				
						res.send({"workers":workers});
					}
				});	
};


exports.editJobAssignment=function(callback,res,jobId,workersList,status){		
	var connection=mysql.getConnection();
	var query = connection.query("Delete from jobassignment where JobID=?",jobId,function(err,workers){
				if (err) {
						console.log("Error: " + err);		
						connection.end();								
					} 
					else {		
						var rows=[];
						for(x in workersList)
						{
							rows.push([0,workersList[x],jobId,new Date()]);
						}
						var connection=mysql.getConnection();	
						var query = connection.query("Insert into jobassignment (JobAsignmentID,WorkerID,JobID,AssignedDate) values ?"
								,[rows],function(err,result){
							if (err) {
								console.log("Error1: " + err);		
								connection.end();	
								return;
							} 
							else {	
								console.log("result:"+result);			
								var query = connection.query("Update JobInfo  SET Status=? where JobID=? "
										,[status,jobId],function(err,result){
									if (err) {
										console.log("Error2: " + err);		
										connection.end();								
									} 
									else {		
										connection.end();					
										res.send({res:"Success"});
									}
								});				
							}
						});	
					}
				});	
}
/*
function getSkilledWorkersForJob(id)
{
	var connection=mysql.getConnection();
	var query =  connection.query("select wi.WorkerID," +
			"concat(wi.FirstName,' ',wi.LastName,' ('," +
			"case when wi.Skill_1 is null then '' else concat(wi.Skill_1,',') end," +
			" case when wi.Skill_2 is null then '' else concat(wi.Skill_2,',') end," +
			" case when wi.Skill_3 is null then '' else concat(wi.Skill_3,',') end," +
			"')') as FullName from workerinfo wi where wi.WorkerStatus='Active' && (" +
			"wi.Skill_1=(select sl.SkillType  from jobinfo ji " +
			"inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) || " +
			"wi.Skill_2=(select sl.SkillType  from jobinfo ji " +
			"inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) || " +
			"wi.Skill_3=(select sl.SkillType  from jobinfo ji " +
			"inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?))",			
			[id,id,id],function(err,skilledWorkers){
		if (err) {
			return err;										
		} 
		else {		
			return skilledWorkers;
		}
	});
}
function getOtherUsersForJob(id)
{	
	var connection=mysql.getConnection();
	var query =  connection.query("select wi.WorkerID," +
			"	concat(wi.FirstName,' ',wi.LastName,' ('," +
			"	 case when wi.Skill_1 is null then '' else concat(wi.Skill_1,',') end," +
			"	 case when wi.Skill_2 is null then '' else concat(wi.Skill_2,',') end," +
			"	 case when wi.Skill_3 is null then '' else concat(wi.Skill_3,',') end," +
			"	')') as FullName from workerinfo wi where wi.WorkerStatus='Active' && wi.WorkerID not in " +
			"	( " +
			"	select wi.WorkerID from workerinfo wi where " +
			"	wi.Skill_1=(select sl.SkillType  from jobinfo ji" +
			" inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) || " +
			"	wi.Skill_2=(select sl.SkillType  from jobinfo ji " +
			" inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?) ||" +
			" wi.Skill_3=(select sl.SkillType  from jobinfo ji" +
			" inner join skillslist sl on ji.SkillID=sl.SkillID where ji.JobID=?)	)",			
			[id,id,id],function(err,otherWorkers){
		if (err) {
			return err;										
		} 
		else {		
			return otherWorkers;
		}
});
}
	*/
	
	
	
	
	
	
	
	

	