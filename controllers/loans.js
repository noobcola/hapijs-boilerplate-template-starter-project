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

        reply(`Your loan ID is: ${loanId}`);
    }

}

module.exports = LoansController;