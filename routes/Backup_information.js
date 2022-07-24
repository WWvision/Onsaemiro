var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function(req, res, next){
	res.render('information-change');
});

router.post('/', function(req, res, next){
	var AdminCode = req.body['AdminCode'];
	var Adminpassword = req.body['AdminPW'];
	var AdminNewName = req.body['NewAdminName'];
	var AdminNewPhone = req.body['NewAdminPhone'];
	var AdminNewWorkNum = req.body['NewAdminWorkNum'];
	var AdminNewEmail = req.body['NewAdminEmail'];
	var AdminNewPassword = req.body['NewAdminPW'];
	mysqlDB.query('select * from AdminTable where AdminCode=? and password=?',[AdminCode, Adminpassword], function (err, rows, fields) {
		if(!err){
			if(rows[0]!=undefined){
				//mysqlDB.query('Update AdminTable set Name='+AdminNewName/*+'and Phone='+ AdminNewPhone +'and WorkNum =' + AdminNewWorkNum + 'and Email='+ AdminNewEmail + 'and password='+ AdminNewPassword */+ 'where AdminCode=' + AdminCode, function(err, rows, fields){
				//mysqlDB.query('update AdminTable set Name=? , Phone=? where AdminCode=?',[AdminNewName,AdminNewPhone,AdminCode], function(err, rows,fields){
				mysqlDB.query('Update AdminTable set Name=? , Phone=? , WorkNum=? , Email=? , password=? where AdminCode=?',[AdminNewName, AdminNewPhone, AdminNewWorkNum, AdminNewEmail, AdminNewPassword, AdminCode], function(err, rows, fields){
					if(!err){
						res.send('Successfuly Changed Information!');
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
