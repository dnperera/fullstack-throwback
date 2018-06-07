var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var dogs = require('./helpers/dogs.js');

/*
Your server here! If you need help getting started,
check out the node anatomy of an http transaction documentation.
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
*/

var server = http.createServer(function(req, res) {
	//var query = url.parse(req.url, true);
	//req.url.startsWith('/api/dogs/') && req.url.split('/').length === 4
	console.log('current url ', req.url);

	if (req.method === 'GET') {
		var urlContents = req.url.split('/');

		if (req.url === '/') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			let html = fs.readFileSync(__dirname + '/public/index.html');
			res.end(html);
		} else if (req.url.indexOf('.css') != -1) {
			let cssPath = path.join(__dirname, 'public', req.url); //__dirname + '/public/style.css';
			let cssStream = fs.createReadStream(cssPath, 'UTF-8');
			res.writeHead(200, { 'Content-Type': 'text/css' });
			cssStream.pipe(res);
		} else if (req.url === '/api/dogs') {
			res.writeHead(200, { 'Content-Type': 'application/json' });

			dogs.getAll(data => {
				res.end(JSON.stringify(data));
			});
		} else if (req.url.startsWith('/api/dogs/') && urlContents.length === 4) {
			dogs.getOneById(urlContents[3], data => {
				if (data) {
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(data));
				} else {
					res.writeHead(404, { 'Content-Type': 'application/json' });
					res.end();
				}
			});

			//res.end();
			//res.end(JSON.stringify(query));
		} else {
			res.writeHead(404);
			res.end();
		}
	} else if (req.method === 'POST') {
		var postData = (request, callback) => {
			var data = '';
			request.on('data', chunk => {
				data += chunk;
				callback(data);
			});
		};

		if (req.url === '/api/dogs') {
			postData(req, newDog => {
				dogObj = JSON.parse(newDog);
				res.writeHead(201, { 'Content-Type': 'application/json' });
				dogs.addOne(dogObj.name, dogObj.breed, data => {
					res.end(JSON.stringify(data));
				});
			});
		}
	}
});

server.listen(3000, function() {
	console.log('bare node server listening on port 3000!');
});

/*
var router = require('routes')();
router.addRoute('/hello/:name', function (req, res, params) {
  res.end('Hello there, ' + params.name + '\n');
});
var http = require('http');
var server = http.createServer(function (req, res) {
    var m = router.match(req.url);
    if (m) m.fn(req, res, m.params)
    else res.end('404!')
});
server.listen(5000);
or if you also want to serve static files as a fallback, npm install ecstatic then:

var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');
var router = require('routes')();
router.addRoute('/hello/:name', function (req, res, params) {
  res.end('Hello there, ' + params.name + '\n');
});
var server = http.createServer(function (req, res) {
  var m = router.match(req.url);
  if (m) m.fn(req, res, m.params);
  else ecstatic(req, res)
});
server.listen(8000);
 */
