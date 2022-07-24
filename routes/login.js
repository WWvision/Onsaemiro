var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function(req, res, next){
	res.render('Test_Admin');
});

router.post('/', function(req, res, next){
	var AdminCode = req.body['AdminCode'];
	var Adminpassword = req.body['AdminPW'];
	mysqlDB.query('select * from AdminTable where AdminCode=\'' + AdminCode + '\' and password=\'' + Adminpassword + '\'', function (err, rows, fields) {
		if(!err){
			if(rows[0]!=undefined){
				res.send('AdminCode:'+ rows[0]['AdminCode'] + '<br>'
				+ 'Password: '+ rows[0]['password']);
			} else {
				res.send('no data');
			}
		} else {
			res.send('error: ' + err);
		}
	});
});

module.exports = router;
