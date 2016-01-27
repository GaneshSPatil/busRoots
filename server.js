var http = require('http');
var handler = require('./lib/app.js');
http.createServer(handler).listen(process.env.OPENSHIFT_NODEJS_PORT || 8000, process.env.OPENSHIFT_NODEJS_IP);
