var Joi = require('joi');
var LoansController = require('../../controllers/api/loans.js');

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
                        id: Joi.string().required()
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/api/v1/loan',
            config: {
                handler: loansController.addLoan,
                validate: {
                    payload: {
                        loanAmount: Joi.number().greater(0).required(),
                        propertyValue: Joi.number().greater(0).required(),
                        socialSecurity: Joi.string().regex(/^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/).required()
                    }
                }
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'routes-api-loans',
    version: '1.0.0'
};