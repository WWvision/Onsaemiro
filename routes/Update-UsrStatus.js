var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

/*router.get('/', function(req, res, next){
	res.render('information-change');
});*/

router.post('/Information', function(req, res, next){
	var UsrCode = req.body['UsrCode'];
	var Name = req.body['Name'];
	var Status1 = req.body['Update_Status_1'];
	var Status2 = req.body['Update_Status_2'];
	var Status3 = req.body['Update_Status_3'];
	var Status4 = req.body['Update_Status_4'];
	var Response = req.body['Update_Response'];
	mysqlDB.query('select * from Usr_manage_1 where UsrCode=? and Name=?',[UsrCode,Name], function (err, rows, fields) {
		if(!err){
			if(rows[0]!=undefined){
				mysqlDB.query('Update Usr_manage_1 set Status_1=?, Status_2=?, Status_3=?, Status_4=?, Response=? where UsrCode=?',[Status1,Status2,Status3,Status4,Response,UsrCode], function(err, rows, fields){
					if(!err){
						res.send('Successfuly Update Status');
					} else {
						res.send('error: '  + err);
					}
				});
			} else {
				res.send('no data');
			}
		} else {
			res.send('error: ' + err);
		}
	});
});

module.exports = router;
