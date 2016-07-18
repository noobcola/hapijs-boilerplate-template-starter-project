"use strict";

const shortid = require('shortid');

class LoansModel {

    construct(database){
        this.database = database;
    }

    getById(loanId){
        //return loan if found, or return empty record
        var loanRecord = this.database[loanId] || {};
        return loanRecord;
    }

    addLoan(loanParams){
        var newLoan = {
            loanAmount: loanParams.loanAmount,
            propertyValue: loanParams.propertyValue,
            socialSecurity: loanParams.socialSecurity,
            id: shortid.generate()
        }

        //Rule: If Loan to Value (LTV) is greater than 40%, we cannot accept the loan
        newLoan.status = loanParams.loanAmount / loanParams.propertyValue > .40

        this.database[newLoan.id] = newLoan;

        return newLoan.id;
    }

}

module.exports = LoansModel;