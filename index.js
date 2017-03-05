'use strict';

const Hapi = require('hapi');

// Parse command-line arguments
const CommandLineArgs = require('command-line-args');
const optionDefinitions = [
  {name: 'port', alias: 'p', type: Number, defaultValue: 8080}
];
const options = new CommandLineArgs(optionDefinitions);

const server = new Hapi.Server();
server.connection({port: options.port});

//Use a simple in-memory map as a database for this project
const database = {};

// Expose database for tests
if (process.env.NODE_ENV === 'test') {
  server.database = database;
}

const hapiPlugins = [
  require('vision'),
  require('inert')
];
server.register(hapiPlugins, (err) => {
  if (err) throw err;
});

const routes = [
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
server.register(routes, (err) => {
  if (err) throw err;

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
    server.start(function (err) {
      if (err) {
        throw err;
      }

      console.log('Server running at: ' + server.info.uri);
    });
  }
});

// Export server endpoints for unit-testing
module.exports = server;