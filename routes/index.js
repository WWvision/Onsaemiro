var express = require('express');
var router = express.Router();

// require maria.js
const maria = require('../database/connect/maria');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res){
  maria.query('CREATE TABLE DEPARTMENT('
  +'DEPART_CODE INT(11) NOT NULL,'
  +'NAME VARCHAR(200) NULL DEFAULT NULL COLLATE utf8mb3_general_ci,'
  +'PRIMART KEY (DEPART_CODE) USING BTREE)', function(err, rows, fields){
    if(!err){
      res.send(rows); //responses send rows
    }else{
      console.log("err : " + err);
      res.send(err); //responses send err
    }
  });
});

router.get('/drop', function(req, res){
  maria.query('DROP TABLE DEPARTMENT', function(err, rows, fields){
    if(!err){
      res.send(rows); // responses send rows
    }else{
      res.send(err);  // responses send err
    }
  });
});

router.get('/insert', function(req, res){
  maria.query('INSERT INTO DEPARTMENT(DEPART_CODE,NAME) VALUES(5001,"ENGLISH")', function(err, rows, fields){
    if(!err){
      res.send(rows); // responses send rows
    }else{
      console.log("err : " + err);
      res.send(err);  // responses send err
    }
  });
});

router.get('/select', function(req, res){
  maria.query('SELECT * FROM DEPARTMENT', function(err, rows, fields){
    if(!err){
      res.send(rows); // responses send rows
    }else{
      console.log("err : " + err);
      res.send(err);  // responses send err
    }
  });
});

router.get('/update', function(req, res){
  maria.query('UPDATE DEPARTMENT SET NAME="UPD ENG" WHERE DEPART_CODE=5001', function(err, rows, fields){
    if(!err){
      res.send(rows); // responses send rows
    }else{
      console.log("err : " + err);
      res.send(err);  // responses send err
    }
  });
});

router.get('/delete', function(req, res){
  maria.query('DELETE FROM DEPARTMENT WHERE DEPART_CODE=5001', function(err, rows, fields){
    if(!err){
      res.send(rows); // responses send rows
    }else{
      console.log("err : "+ err);
      res.send(err);  // responses send err
    }
  });
});


//GET
router.get('/api/get/demo', function(req, res){
  res.status(200).json({
    "message": "Call get API demo"
  });
});

//POST
router.post('/api/post/demo', function(req, res){
  res.status(200).json({
    "message": "Call post API demo"
  });
});

module.exports = router;
