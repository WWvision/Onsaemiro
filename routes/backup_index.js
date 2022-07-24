var express = require('express');
var router = express.Router();

// require maria.js
//const maria = require('../database/connect/maria');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET
router.get('/api/get/demo', function(req, res){
  res.status(200).json({
    "message": "Call get API demo"
  });
});

//POST
router.post('/api/post/demo', function(req, res){
  res.status(200).json{
    "message": "Call post API demo"
  });
});

module.exports = router;
