const Hapi = require('hapi');
const Path = require('path');
const Fs = require('fs');

const server = new Hapi.Server();
server.connection({ port: 8000, host: 'localhost'});

//Use a simple in-memory map as a database for this project
var database = {};

// Expose database for tests
if (process.env.NODE_ENV === 'test') {
    server.database = database;
}

var plugins = [
    require('vision'), require('inert'),
    {
        register: require('./routes/api/loans.js'),
        options: {
            database: database
        }
    },
    {
        register: require('./routes/app/loans.js')
    }
];

server.register(plugins, (err) => {
    //serve static files
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'static'
            }
        }
    });

    // load views
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    if (!module.parent) {
        server.start(function(err) {
            if (err) { throw err; }

            console.log('Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;