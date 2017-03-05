'use strict';

const LoansModel = require('../../models/loans.js');

class LoansController {

  constructor(database) {
    this.loanModel = new LoansModel(database);
  }

  getById(request, reply) {
    const loanId = request.params.id;

    const loan = this.loanModel.getById(loanId);
    if (!loan.id) {
      //Loan not found
      reply({}).code(404);
    } else {
      reply(loan);
    }
  }

  addLoan(request, reply) {
    const newLoan = request.payload;
    const loanId = this.loanModel.addLoan(newLoan);

    reply({loanId: loanId}).code(201);
  }

}

module.exports = LoansController;