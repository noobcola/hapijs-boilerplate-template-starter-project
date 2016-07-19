"use strict";
var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;

const expect = require('expect.js');
const server = require('../index.js');
const database = server.database;

var loanId;

describe('Routes /api/v1/loan', function() {
    describe('GET /api/v1/loan/{id}', function(){
        it('should not have any loan records in database', function(done){
            expect(Object.keys(database)).to.have.length(0);
            done();
        });

        it('returns 404 when loan isn\'t found', function(done) {
            var options = {method: 'GET', url: '/api/v1/loan/1234abcd'};
            server.inject(options, function(response) {
                expect(response.statusCode).to.be(404);
                done();
            });
        });
    });

    describe('POST /api/v1/loan', function(){
        it('fails when there\'s no payload', function(done) {
            var options = {method: 'POST', url: '/api/v1/loan'};
            server.inject(options, function(response) {
                expect(response.statusCode).to.be(400);
                done();
            });
        });

        it('fails with an invalid payload', function(done) {
            var options = {method: 'POST', url: '/api/v1/loan', payload: {}};
            server.inject(options, function(response) {
                expect(response.statusCode).to.be(400);
                done();
            });
        });

        it('fails when there\'s too many properties in the payload', function(done) {
            var payload = {
                loanAmount: 2000,
                propertyValue: 294599,
                socialSecurity: '234-44-4444',
                extraProperty: 'This shouldnt be here'
            }
            var options = {method: 'POST', url: '/api/v1/loan', payload: payload};
            server.inject(options, function(response) {
                expect(response.statusCode).to.be(400);
                done();
            });
        });

        it('should return status 201 if payload is correct', function(done) {
            var payload = {
                loanAmount: 2000,
                propertyValue: 294599,
                socialSecurity: '234-44-4444'
            }
            var options = {method: 'POST', url: '/api/v1/loan', payload: payload};
            server.inject(options, function(response) {
                expect(response.statusCode).to.be(201);
                done();
            });
        });



        it('should return a loan ID when successfully created', function(done) {
            var payload = {
                loanAmount: 40,
                propertyValue: 100,
                socialSecurity: '234-44-4444'
            }
            var options = {method: 'POST', url: '/api/v1/loan', payload: payload};
            server.inject(options, function(response) {
                expect(response.result).to.have.property('loanId');
                loanId = response.result.loanId;
                done();
            });
        });

        it('should accept loans that have LTV less than or equal to 40%', function(done) {
            var options = {method: 'GET', url: `/api/v1/loan/${loanId}`};
            server.inject(options, function(response) {
                expect(response.result).to.have.property('isAccepted');
                expect(response.result.isAccepted).to.be.ok();
                done();
            });
        });

        it('should reject loans that have LTV greater than 40%', function(done) {
            var payload = {
                loanAmount: 41,
                propertyValue: 100,
                socialSecurity: '234-44-4444'
            }
            var options = {method: 'POST', url: '/api/v1/loan', payload: payload};
            server.inject(options, function(response) {

                loanId = response.result.loanId;
                expect(response.result).to.have.property('loanId');

                options = {method: 'GET', url: `/api/v1/loan/${loanId}`};

                server.inject(options, function(response) {
                    expect(response.result).to.have.property('isAccepted');
                    expect(response.result.isAccepted).to.not.be.ok();
                    done();
                });

            });
        });


    });
});