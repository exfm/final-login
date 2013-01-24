"use strict";

var Authenticate = require('../index.js'),
    login = Authenticate.login;
    
function getLogin(done){
    return new login('#login_form',
        {
            'url': 'http://ex.fm/api/v3/authenticate',
            'buttonSubmitClass': 'submitting',
            'submitButton': '#login_button',
            'focus': '#login_username'
        }
    );
};

function resetLogin(){
    $('#login_form').off('success error');
    $('#login_username').val('');
    $('#login_password').val('');
};

describe("Login", function(){
    it("should throw an error if username is empty", function(done){
        console.log('run 1');
        resetLogin();
        var l = getLogin();
        l.on(
            'error', 
            function(e, d){
                assert.equal(d.message, 'username cannot be empty');
                done();
            }
        ).submit();
    });
    it("should throw an error if password is empty", function(done){
        console.log('run 2');
        resetLogin();
        $('#login_username').val('testuser');
        var l = getLogin();
        l.on(
            'error', 
            function(e, d){
                console.log(d);
                assert.equal(d.message, 'passsword cannot be empty');
                done();
            }
        ).submit();
    });
    it("should throw an error username and password are incorrect", function(done){
        console.log('run 3');
        this.timeout(10000);
        resetLogin();
        $('#login_username').val('testuser');
        $('#login_password').val('testpassword');
        var l = getLogin();
        l.on(
            'error', 
            function(e, d){
                console.log(d);
                assert.equal(d.message, 'BAD REQUEST');
                done();
            }
        ).submit();
    });
}); // end Login