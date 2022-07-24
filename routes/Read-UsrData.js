var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function(req,res,next){
	mysqlDB.query('SELECT * FROM Usr_manage_1', function(err, rows, fields){
		if(!err){
			res.render('Admin_page', {rows});//Admin_page
		} else {
			res.render(err);
		}
	});
});

router.get('/Read-Usrdata/AdminAll', function(req, res, next){
	mysqlDB.query('SELECT * FROM Usr_manage_1', function(err, rows, fields){
		if(!err){
			console.log(rows);
			res.send(rows);
		} else {
			console.log('query error: ' + err);
			res.send(err);
		}
	});
});


router.get('/Read-Usrdata/UsrStatus1', function(req, res, next){
	mysqlDB.query('SELECT * FROM Usr_manage_1', function(err, rows, fields){
		if(!err){
			console.log(rows[1]);
			res.send(rows[1]);
		} else {
			console.log('query error: ' + err);
			res.send(err);
		}
	});
});


router.get('/Read-Usrdata/UsrInfo1', function(req, res, next){
	mysqlDB.query('SELECT * FROM UsrTable', function(err, rows, fields){
		if(!err){
			console.log(rows[1]);
			res.send(rows[1]);
		} else {
			console.log('query error: ' + err);
			res.send(err);
		}
	});
});


router.get('/Read-Usrdata/UsrSleep1', function(req, res, next){
	mysqlDB.query('SELECT * FROM UsrSleepTable', function(err, rows, fields){
		if(!err){
			console.log(rows[1]);
			res.send(rows[1]);
		} else {
			console.log('query error: ' + err);
			res.send(err);
		}
	});
});
//router.get('/', function(req, res, next){
//	mysql.DB.

module.exports = router;
