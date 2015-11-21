var mysql = require('./dbConnectionsController');

exports.getCalendarView = function(callback,res){
	var connection=mysql.getConnection();
	var query = connection.query("select sum(jobscount) as title,JobDate as start,sum(NewCount)" +
			" as NewCount from (SELECT count(*) as jobscount,StartDate as JobDate,0 NewCount " +
			"from JobInfo where month(StartDate) =month(now()) and year(StartDate)=year(now())" +
			" group by StartDate union SELECT 0 jobscount, StartDate ,count(*) as NewCount" +
			" from JobInfo where month(StartDate) =month(now()) and year(StartDate)=year(now())" +
			" and status='New' group by StartDate )k group by JobDate",function(err,data){
		if (err) {
			console.log("Error: " + err);		
			connection.end();								
		} 
		else {	
			connection.end();	
			res.send(data);
		}
	});	
	
};

exports.getEvents=function(callback,res,d){
	console.log(new Date(new Date(d).toLocaleDateString()));
	var date=new Date(new Date(d).toLocaleDateString());
	var connection=mysql.getConnection();
	var query = connection.query("SELECT description, jobID FROM WorkerResourceCenter.JobInfo where StartDate=? ",date,function(err,events){
		if (err) {
			console.log("Error: " + err);		
			connection.end();								
		} 
		else {		
			connection.end();	
			res.render('dayView',{"events":events});
		}
	});	
};
exports.getJobDescription=function(callback,res,id){	
	console.log("id: "+id);
	var connection=mysql.getConnection();
	var query = connection.query("SELECT JI.JobID,JI.Title,JI.description,SL.SkillType,NoWorkers FROM JobInfo JI inner join SkillsList SL where  JI.SkillID=SL.SkillID and JI.JobID=?"
			,id,function(err,jobdetails){
		if (err) {
			console.log("Error: " + err);		
			connection.end();								
		} 
		else {		
			connection.end();	
			console.log(jobdetails[0].Title);
			res.render('assignjobs',{"job":jobdetails});
		}
	});	
};

