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

app.get('/profile', function(req, res){
	res.render('profile', {qs: req.query});
});

app.post('/profile', urlencodedParser, function(req, res){
	console.log(req.body);
	res.render('profile', {data: req.body});
});


app.listen(3000);
