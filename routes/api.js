var axios = require('axios');
var express = require('express');
var app = express();
var router = express.Router();
var conversion_xy = require('../xy_conversion.js');
var mysql_db = require('../mysql-db');

// api code

// Weather_api
router.get('/get_weather/:lat/:lon/:date/:time', function(request,response){
	console.log('Getting Weather Info');
	var lat = request.params.lat;//위도 정보
	var lon = request.params.lon;//경도 정보
	var date = request.params.date;//대상 날짜
	var time = request.params.time;//대상 시간
	var converted = conversion_xy.dfs_xy_conv("toXY",lat,lon);//위도와 경도를 기상청 api에서 사용하는 x,y좌표로 변환
	var nx = converted.x;//변환된 x좌표
	var ny = converted.y;//변환된 y좌표
	var api_key = 'wqor8jGxnLcBmwjji2TSh2RFSm%2FcARGwz0D%2FA09jRuBuB4AfiCp5yefWhC1glP1oVRDxITi870hYRDwoUa2uIg%3D%3D';
	var api_url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${api_key}&numOfRows=60&pageNo=1&dataType=JSON&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}`;
	//api 조회
	axios.get(api_url).then(function(res){
		try{
			console.log('Success');
			response.send(res.data.response.body.items.item);
			}
		catch(error){
			console.log(error);
			response.send('error');
		}
	});
});

//update_UsrSleepdata_api(whole)
router.post('/update_sleep_data_table', function(request, response){
	var UsrCode = request.body.UsrCode;
	var SleepTime = request.body.SleepTime;
	var WakeUpTime = request.body.WakeUpTime;
	var Alarm_Q = request.body.Alarm_Q;
	var Alarm_A = request.body.Alarm_A;
	var sql_query = `update UsrSleepTable set SleepTime='${SleepTime}', WakeUpTime='${WakeUpTime}', Alarm_Q='${Alarm_Q}', Alarm_A='${Alarm_A}' where UsrCode='${UsrCode}';`;
	
	console.log('Updating User Sleep Data');
	try{
		mysql_db.query(sql_query ,function(err, res){
			if(err){
				console.log(err);
				response.send(err);
			}
			response.send('Success');
		});
	}
	catch(error){
		console.log(error);
		response.send(error);
	}
});

//update_UsrSleepdata_api(single column)
router.get('/get_UsrSleepData/:UsrCode', function(request, response){
	console.log('Getting UsrSleepData');
	var id = request.params.UsrCode;
	try{
	mysql_db.query(`select * from UsrSleepTable where UsrCode = '${id}';`, function(error,  res){
			if(error){
				console.log(error);
				response.send(error);
			}
			if(res.length == 0){
				console.log('Wrong UsrCode');
				response.send('Wrong UsrCode');
			}
			else{
				console.log('Success');
				response.send(res);
			}
		});
	}
	catch(err){
		console.log(err);
		response.send(err);
	}
});

//update_UsrSleepdata_api(Single column)
router.post('/update_UsrSleepData/:UsrCode/:field', function(request, response){
	console.log('Updating UsrSleepData');
	var id = request.params.UsrCode;
	var field = request.params.field;
	var data = request.body.data;
	try{
		mysql_db.query(`update UsrSleepTable set ${field} = ${data} where UsrCode = '${id}';`, function(error, res){
			if(error){
				response.send(error);
				console.log(error);
			}
			response.send('Success');
			console.log('Success');
		});
	}
	catch(error){
		response.send(error);
	}

});

//Alert Response Counter adder
router.post('/alarm_a_counter_up/:UsrCode', function(request, response){
	console.log('Alarm_A couter up');
	var usrcode = request.params.UsrCode;
	var get_data_sql = `select Alarm_A, Alarm_Q from UsrSleepTable where UsrCode = '${usrcode}';`;
	mysql_db.query(get_data_sql, function(error,res_a){
		if(error){
			console.log(error);
		}
		var alarm_a = parseInt(res_a[0].Alarm_A);
		var alarm_q = parseInt(res_a[0].Alarm_Q);
		var response_rate = Math.round((alarm_a/alarm_q)*100);
		alarm_a = alarm_a + 1;
		mysql_db.query(`update UsrSleepTable set Alarm_a = '${alarm_a}' where UsrCode = '${usrcode}';`, function(err, res_b){
			if(err){
				console.log(err);
			}
			console.log('Alarm_A update success');
		});
		mysql_db.query(`update Usr_manage_1 set Response = ${response_rate} where UsrCode = '${usrcode}';`, function(err, res_c){
			if(err){
				console.log(err);
			}
			console.log('Response update success');
		});
		
		
	});
	response.send('success');
});

//Alert Counter adder
router.post('/alarm_q_counter_up/:UsrCode', function(request, response){
	console.log('Alarm_Q couter up');
	var usrcode = request.params.UsrCode;
	var get_data_sql = `select Alarm_A, Alarm_Q from UsrSleepTable where UsrCode = '${usrcode}';`;
	mysql_db.query(get_data_sql, function(error,res_a){
		if(error){
			console.log(error);
		}
		var alarm_a = parseInt(res_a[0].Alarm_A);
		var alarm_q = parseInt(res_a[0].Alarm_Q);
		var response_rate = Math.round((alarm_a/alarm_q)*100);
		alarm_q = alarm_q + 1;
		mysql_db.query(`update UsrSleepTable set Alarm_Q = '${alarm_q}' where UsrCode = '${usrcode}';`, function(err, res_b){
			if(err){
				console.log(err);
			}
			console.log('Alarm_Q update success');
		});
		mysql_db.query(`update Usr_manage_1 set Response = ${response_rate} where UsrCode = '${usrcode}';`, function(err, res_c){
			if(err){
				console.log(err);
			}
			console.log('Response update success');
		});
		
		
	});
	response.send('success');
});

//Score Updating api
router.post('/score/:UsrCode/:Code', function(request, response){
	console.log('Score updating');
	var usrcode = request.params.UsrCode;
	var code = request.params.Code;
	
	//sql connection, if add_sub = 0 -> add, add_sub = 1 -> sub
	function score_sql(usr, column, add_sub, response){
		if(add_sub == 0){
			mysql_db.query(`select ${column} from Usr_manage_1 where UsrCode = '${usr}';`,function(err, res){
				var score = res[0][`${column}`];
				if(err){
					console.log(err);
					response.send(err);
				}
				else if(score == 10){
					console.log(`${usr} score is already 10`);
					response.send('Done');
				}
				else{
					score = score + 1;
					mysql_db.query(`update Usr_manage_1 set ${column} = ${score} where UsrCode = '${usr}';` ,function(err_a, res_a){
						if(err_a){
							console.log(err_a);
							response.send(err_a);
						}
						else{
							console.log('Change Success');
							response.send('Done');
						}
					})
				}
			});
		}
		if(add_sub == 1){
			mysql_db.query(`select ${column} from Usr_manage_1 where UsrCode = '${usr}';`,function(err, res){
				var score = res[0][`${column}`];
				console.log(column, usrcode, res);
				if(err){
					console.log(err);
					response.send(err);
				}
				else if(score == 0){
					console.log(`${usr} score is already 0`);
					response.send('Done');
				}
				else{
					score = score - 1;
					mysql_db.query(`update Usr_manage_1 set ${column} = ${score} where UsrCode = '${usr}';` ,function(err_a, res_a){
						if(err_a){
							console.log(err_a);
							response.send(err_a);
						}
						else{
							console.log('Change Success');
							response.send('Done');
						}
					})
				}
			});
		}
	}


	if(code == 1){
		score_sql(usrcode, 'Status_1', 0, response);	
	}
	if(code == 2){
		score_sql(usrcode, 'Status_1', 1, response);
	}
	if(code == 3){
		score_sql(usrcode, 'Status_2', 0, response);
	}
	if(code == 4){
		score_sql(usrcode, 'Status_2', 1, response);
	}
	if(code == 5){
		score_sql(usrcode, 'Status_3', 0, response);
	}
	if(code == 6){
		score_sql(usrcode, 'Status_3', 1, response);
	}
});

router.post('/event_alert/:UsrCode/:Code', function(request, response){
	var usrcode = request.params.UsrCode;
	var code = request.params.Code;
	var sql = `update Usr_manage_1 set Status_4 = ${code } where UsrCode = '${usrcode}';`

	console.log('Updating Event Alert Code');
	mysql_db.query(sql, function(err, res){
		if(err){
			console.log(err);
			response.send(err);
		}
		console.log('Success');
		response.send('Success');
	});
});
module.exports = router;
