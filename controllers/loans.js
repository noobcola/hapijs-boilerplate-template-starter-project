"use strict";

const LoansModel = require('../models/loans.js')

class LoansController {

    constructor(database){
        this.loanModel = new LoansModel(database);
    }

    getById(request, reply){
        var loanId = request.params.id;

        var loan =  this.loanModel.getById(loanId);
        console.log(loan);

        reply(loan);
    }

    addLoan(request, reply){
        var loanId = this.loanModel.addLoan(request);

        reply({loanId: loanId});
    }

}

module.exports = LoansController;