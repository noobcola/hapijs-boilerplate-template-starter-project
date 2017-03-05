'use strict';

exports.register = function (server, options, next) {

  // Declare routes
  server.route([
    {
      method: 'GET',
      path: '/loanStatus',
      handler: {
        view: 'loanstatus'
      }
    },
    {
      method: 'GET',
      path: '/',
      handler: {
        view: 'loanform'
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'routes-app-loans',
  version: '1.0.0'
};