"use strict";

const LoansModel = require('../../models/loans.js')

class LoansController {

    constructor(database){
        this.loanModel = new LoansModel(database);
    }

    getById(request, reply){
        var loanId = request.params.id;

        var loan =  this.loanModel.getById(loanId);
        if ( ! loan.id ){
            //Loan not found
            reply({}).code(404);
        } else {
            reply(loan);
        }
    }

    addLoan(request, reply){
        var newLoan = request.payload
        var loanId = this.loanModel.addLoan(newLoan);

        reply({loanId: loanId}).code(201);
    }

}

module.exports = LoansController;