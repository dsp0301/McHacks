var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/', function(req, res){
	res.render('home');
});

app.get('/home', function(req, res){
	res.render('home', {qs: req.query});
});
var test;

app.get('/trashboard', function(req, res){
	res.render('trashboard', {qs: req.query});
});

app.post('/trashboard', urlencodedParser, function(req, res){
	let mysql  = require('mysql');
	let config = require('./config.js');
	let connection = mysql.createConnection(config);
	let sql2 = `INSERT INTO post(email, title, message)
	VALUES('` + req.body.email + `', '` + req.body.title + `', '` + req.body.message + `')`;
	connection.query(sql2);
	console.log(sql2);
	connection.end();
  res.render('trashboard', {data: req.body});
});

app.get('/about', function(req, res){
	res.render('about', {qs: req.query});
});

app.post('/home', urlencodedParser, function(req, res){

  console.log(req.body);

	let mysql  = require('mysql');
	let config = require('./config.js');
	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO user1(email, name, company, phone,address)
	VALUES('` + req.body.email + `', '` + req.body.name + `', '` + req.body.companyName + `',
	 '` + req.body.contactNumber + `','` + req.body.address + `')`;
	connection.query(sql);
	console.log(sql);
	connection.end();
  res.render('trashboard', {data: req.body});

});


app.listen(3000);
