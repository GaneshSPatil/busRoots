var http = require('http');
var handler = require('./lib/app.js');
http.createServer(handler).listen(8000);
