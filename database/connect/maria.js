const maria = require('mysql');

const conn = maria.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '2489',
	database: 'db name'
});

module.exports = conn;
