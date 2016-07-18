var Joi = require('joi');
var LoansController = require('../../controllers/loans.js');

exports.register = function(server, options, next) {
    // Setup the controller
    var loansController = new LoansController(options.database);

    server.bind(loansController);

    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/api/v1/loan/{id}',
            config: {
                handler: loansController.getById,
                validate: {
                    params: {
                        id: Joi.string().length(8, 'utf8').required()
                    }
                }
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'routes-tasks',
    version: '1.0.1'
};