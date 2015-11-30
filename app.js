var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var favicon = require('serve-favicon');
var loginController = require('./routes/loginController');
var workerController = require('./routes/workerController');
var employerController = require('./routes/employerController');

//var calendarController = require('./routes/calendarController');
//var jobInfo = require('./routes/jobsController');
//var skillsList = require('./routes/skillsController');

var appController = require('./routes/appController');

var app = express();
var http = require('http');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', '*');
    next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.set('port', 8000);

app.get('/home',appController.home);

app.get('/',appController.homepage);
app.get('/workerRegistration',workerController.workerRegister);
app.get('/workerList',workerController.workerList);
app.get('/employerRegistration',employerController.employerRegistration);
app.get('/employerList',employerController.employerList);
app.post('/login',loginController.adminLogin);
app.get('/admin',appController.WRCAdmin);


///app.get('/v1/wrc/calendar',calendarController.showCalendar);
//app.get('/getcalendar',calendarController.getCalendarView);
//app.get('/renderevents',calendarController.renderEvents);
//app.get('/jobdescription',calendarController.getJobDescription);

app.get('/v1/wrc/employers',employerController.getEmployers);
app.post('/v1/wrc/newEmployer',employerController.newEmployer);
/*app.post('/editEmployer',employersController.editEmployer)
app.post('/deleteEmployer',employersController.deleteEmployer)*/


app.get('/v1/wrc/workers',workerController.getWorkers);
app.post('/v1/wrc/newWorker',workerController.newWorker);
//app.get('/v1/wrc/workers/:id',workerController.getWorker);

//app.put('/v1/wrc/workers/:id', workerController.updateWorker);
//app.del('/v1/wrc/workers/:id', wokerController.deleteWorker);
//app.post('/register',controller.register);

//app.get('/dashboard',workerController.getDashboard);

// Job API's
//app.get('/v1/wrc/job', jobInfo.getJobs);
//app.post('/v1/wrc/job', jobInfo.submitJob);
//app.get('/v1/wrc/job/:id', jobInfo.getJob);
//app.put('/v1/wrc/job/:id', jobInfo.udpateJob);
//app.delete('/v1/wrc/job/:id', jobInfo.deleteJob);

//Skill API's
//app.get('/v1/wrc/skills', skillsList.getSkills);
//app.get('/v1/wrc/skill/:id', skillsList.getSkill);
//app.post('/v1/wrc/skills/', skillsList.addSkill);
//app.put('/v1/wrc/skills/:id', skillsList.updateSkill);
//app.delete('/v1/wrc/skills/:id', skillsList.deleteSkill);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
