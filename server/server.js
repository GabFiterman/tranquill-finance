/* eslint-disable no-undef */
var app = require ('./app');
var http = require('http');
require('dotenv').config();

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Create HTTP SERVER
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a Number, string, or false
function normalizePort(val) {
    var port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// Event listener for HTTP server "error event"
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    // handle specifict listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' required elevated privileges');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('****** YOU ROCK! ******');
    console.log('Your server is on, and listening on ' + bind);
}
