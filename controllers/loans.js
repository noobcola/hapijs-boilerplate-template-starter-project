"use strict";

class LoansController {

    constructor(database){
        this.database = database;
    }

    getById(request, reply){
        var loanId = request.params.id;

        this.database[loanId] = loanId;

        reply(`Your loan ID is: ${loanId}`);
    }

}

module.exports = LoansController;