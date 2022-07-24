var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function(req, res, next){
	res.render('join');
});

router.post('/', function(req, res, next){
	var UsrCode = req.body['UsrCode'];
	var Name = req.body['ko_Name'];
	var Imp = req.body['ko_ImpCode'];
	var S1 = req.body['S1'];
	var S2 = req.body['S2'];
	var S3 = req.body['S3'];
	var S4 = req.body['S4'];

	mysqlDB.query('update Usr_manage_1 set Name=?, ImpCode=?, Status_1=?,Status_2=?, Status_3=?, Status_4=? where UsrCode=?', [Name, Imp, S1, S2, S3, S4, UsrCode], function(err, rows, fields){
		if(!err){
			res.send('Success');
		} else {
			res.send('error: ' + err);
		}
	});

});

module.exports = router;
