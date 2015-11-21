var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var workerController = require('./routes/workerController');
var employersController=require('./routes/employersController');
var calendarController=require('./routes/calendarController');
var jobInfo = require('./routes/jobsController');
var skillsList = require('./routes/skillsController');
var login = require('./routes/loginController');

var app = express();
var http = require('http')


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', '*');

    next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(__dirname + '/public/img/favicon.ico'));
//app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.set('port', 8000);

app.get('/',workerController.homepage);
app.get('/wRegister',workerController.workerRegister);
app.get('/eregister',workerController.employeeRegister);
app.post('/login',login.employerLogin);
app.get('/aHome', workerController.aHome);

app.get('/v1/wrc/calendar',calendarController.showCalendar);
app.get('/getcalendar',calendarController.getCalendarView);
app.get('/renderevents',calendarController.renderEvents);
app.get('/jobdescription',calendarController.getJobDescription);

app.get('/v1/wrc/employer',employersController.employer);
app.post('/newEmployer',employersController.newEmployer);
/*app.post('/editEmployer',employersController.editEmployer)
app.post('/deleteEmployer',employersController.deleteEmployer)*/


//app.get('/getWorkerInfo', controller.getWorkerInfo);
app.post('/newWorker', workerController.newWorker);
//app.post('/register',controller.register);
app.get('/v1/wrc/workers',workerController.getWorkers);
app.get('/dashboard',workerController.getDashboard);

// Job API's
app.get('/v1/wrc/job', jobInfo.getJobs);
//app.post('/v1/wrc/job', jobInfo.submitJob);
app.get('/v1/wrc/job/:id', jobInfo.getJob);
//app.put('/v1/wrc/job/:id', jobInfo.udpateJob);
//app.delete('/v1/wrc/job/:id', jobInfo.deleteJob);

//Skill API's
app.get('/v1/wrc/skills', skillsList.getSkills);
app.get('/v1/wrc/skill/:id', skillsList.getSkill);
app.post('/v1/wrc/skills/', skillsList.addSkill);
app.put('/v1/wrc/skills/:id', skillsList.updateSkill);
//app.delete('/v1/wrc/skills/:id', skillsList.deleteSkill);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
