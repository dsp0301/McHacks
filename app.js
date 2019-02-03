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

app.get('/about', function(req, res){
	res.render('about', {qs: req.query});
});

app.post('/home', urlencodedParser, function(req, res){

  console.log(req.body);

  let config = {
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'trashTalk'
  };

  module.exports = config;

  let mysql = require('mysql');

  let connection = mysql.createConnection(config);

  // update statment
  let sql = `INSERT INTO user1(email, name, company, phone, address) VALUES (` + `"` +  req.body.email+ `", ` + `"` + req.body.name + `", "` + req.body.companyName + `", ` + req.body.contactNumber +`, "` + req.body.address + `")`;

  //let data = ['ehrgghjghjghjghjghjghghgjghjwjkrhewjk', 1];

  // execute the UPDATE statement
  connection.query(sql, (error, results, fields) => {
    if (error){
      return console.error(error.message);
    }
    console.log('Rows affected:', results.affectedRows);
  });

  connection.end();


  res.render('trashboard', {data: req.body});

});


app.listen(3000);
