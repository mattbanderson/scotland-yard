var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
const PORT = 8080
var file = new static.Server('./public');
console.log('Server running on port', PORT)

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);
