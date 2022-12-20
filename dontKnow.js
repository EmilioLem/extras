//First we will console log a funny koke

//An HTTP server to say Hello World

var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

//A function that returns a string

var helloWorld = function() {
    return 'Hello World';
};
