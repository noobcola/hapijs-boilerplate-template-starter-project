const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8000, host: 'localhost'});

//Use a simple in-memory map as a database for this project
var database = {};

var plugins = [
    {
        register: require('./routes/api/loans.js'),
        options: {
            database: database
        }
    }
];

server.register(plugins, function (err) {
    if (err) { throw err; }

    server.start(function(err) {
        if (err) { throw err; }

        console.log('info', 'Server running at: ' + server.info.uri);
    });
});