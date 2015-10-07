REATE TABLE `EmployerInfo` (
  `EmployerID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `MiddleName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Company` varchar(45) DEFAULT NULL,
  `Address1` varchar(20) DEFAULT NULL,
  `Address2` varchar(20) DEFAULT NULL,
  `City` varchar(20) DEFAULT NULL,
  `State` varchar(20) DEFAULT NULL,
  `Zip` varchar(10) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Phone` varchar(12) DEFAULT NULL,
  `DriverLicense` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`EmployerID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `JobInfo` (
  `JobID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(20) DEFAULT NULL,
  `Description` varchar(150) DEFAULT NULL,
  `WorkSiteAddress` varchar(150) DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `SkillRequired` varchar(45) DEFAULT NULL,
  `NoWorkers` int(11) DEFAULT NULL,
  `NoHours` int(11) DEFAULT NULL,
  `PayRate` decimal(10,0) DEFAULT NULL,
  `EmployerRating` int(11) DEFAULT NULL,
  `WorkerRating` int(11) DEFAULT NULL,
  `JobStatusID` int(11) DEFAULT NULL,
  `WorkerComments` varchar(11) DEFAULT NULL,
  `EmployerComments` varchar(11) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `EmployerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`JobID`),
  KEY `EmployerID_idx` (`EmployerID`),
  KEY `JobstatusJob_idx` (`JobStatusID`),
  CONSTRAINT `Employer` FOREIGN KEY (`EmployerID`) REFERENCES `EmployerInfo` (`EmployerID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `JobInfo_Jobstatus` FOREIGN KEY (`JobStatusID`) REFERENCES `JobStatus` (`JobStatusID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `JobStatus` (
  `JobStatusID` int(11) NOT NULL,
  `WorkerID` int(11) DEFAULT NULL,
  `JobID` int(11) DEFAULT NULL,
  PRIMARY KEY (`JobStatusID`),
  KEY `JobStatus_Jobs_idx` (`JobID`),
  KEY `JobStatus_Worker_idx` (`WorkerID`),
  CONSTRAINT `JobStatus_Jobs` FOREIGN KEY (`JobID`) REFERENCES `JobInfo` (`JobID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `JobStatus_Worker` FOREIGN KEY (`WorkerID`) REFERENCES `WorkerInfo` (`WorkerID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `LoginInfo` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `RolesID` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `d_idx` (`RolesID`),
  CONSTRAINT `Login_Roles` FOREIGN KEY (`RolesID`) REFERENCES `Roles` (`RolesID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Roles` (
  `RolesID` int(11) NOT NULL,
  `Roles` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`RolesID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `SkillsList` (
  `SkillID` int(11) NOT NULL,
  `SkillType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SkillID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `UserSkills` (
  `SkillID` int(11) NOT NULL,
  `ID` int(11) NOT NULL,
  `WorkerID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `j_idx` (`SkillID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `WorkerInfo` (
  `WorkerID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `MiddleName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `SSN` varchar(12) DEFAULT NULL,
  `Address1` varchar(30) DEFAULT NULL,
  `Address2` varchar(30) DEFAULT NULL,
  `City` varchar(35) DEFAULT NULL,
  `State` varchar(45) DEFAULT NULL,
  `Zip` varchar(15) DEFAULT NULL,
  `Phone` varchar(12) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Ethnicity` varchar(25) DEFAULT NULL,
  `JobSeeker` varchar(10) DEFAULT NULL,
  `WorkerStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`WorkerID`),
  KEY `j_idx` (`SkillId`),
  KEY `j_idx1` (`SkillId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
