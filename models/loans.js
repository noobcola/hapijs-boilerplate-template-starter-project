"use strict";

class LoansModel {

    construct(database){
        this.database = database;
    }

    getById(id){
        //return loan if found, or return empty record
        var loanRecord = this.database[id] || {};
        return loanRecord;
    }

    addLoan(loanParams){

    }

}