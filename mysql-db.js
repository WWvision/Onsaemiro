var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'szoo',
	password: '2489',
	database: 'Onsaemiro_db'
});

module.exports = connection;
