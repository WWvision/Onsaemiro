var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

/*router.get('/', function(req, res, next){
	res.render('information-change');
});*/

router.post('/', function(req, res, next){
	var UsrCode = req.UsrCode;//req.body.UsrCode
	var Status1 = req.Status1;
	var Status2 = req.Status2;
	var Status3 = req.Status3;
	var Status4 = req.Status4;
	var Response = req.Response;
	
	mysqlDB.query('update Usr_manage_1 set Status_1=?, Status_2=?, Status_3=?, Status_4=?, Response=? where UsrCode=?',[Status1,Status2,Status3,Status4,Response,UsrCode], function(err, rows, fields){
		if(!err){
			res.send('Successfuly Update User Status');
		} else {
			res.send('error: ' + err);
		}
	});
});


module.exports = router;
