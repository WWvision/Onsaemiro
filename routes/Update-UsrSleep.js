var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

/*router.get('/', function(req, res, next){
	res.render('information-change');
});*/

router.post('/Information', function(req, res, next){
	console.log(req);
	var UsrCode = req.body['UsrCode'];
	var Name = req.body['Name'];
	var SleepTime = req.body['SleepTime'];
	var WakeUpTime = req.body['WakeUpTime'];
	var AlarmQ = req.body['Alarm_Q'];
	var AlarmA = req.body['Alarm_A'];
	mysqlDB.query('select * from UsrSleepTable where UsrCode=? and Name=?',[UsrCode,Name], function (err, rows, fields) {
		if(!err){
			if(rows[0]!=undefined){
				mysqlDB.query('Update UsrSleepTable set SleepTime=?, WakeUpTime=?, Alarm_Q=?, Alarm_A=? where UsrCode=?',[SleepTime,WakeUpTime,AlarmQ,AlarmA,UsrCode], function(err, rows, fields){
					if(!err){
						console.log(req);
						res.send('Successfuly Update Status');
					} else {
						console.log(err);
						res.send('error: '  + err);
					}
				});
			} else {
				console.log('no data');
				res.send('no data');
			}
		} else {
			console.log(err);
			res.send('error: ' + err);
		}
	});
});

module.exports = router;
