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

function resetLogin(l){
    l.form.off('success error submit');
    $('#login_username').val('');
    $('#login_password').val('');
};

describe("Login", function(){
    it("should throw an error if username is empty", function(done){
        var l = getLogin();
        l.form.on(
            'error', 
            function(e, d){
                assert.equal(d.message, 'username cannot be empty');
                resetLogin(l);
                done();
            }
        ).submit();
    });
    it("should throw an error if password is empty", function(done){
        $('#login_username').val('testuser');
        var l = getLogin();
        l.form.on(
            'error', 
            function(e, d){
                assert.equal(d.message, 'password cannot be empty');
                resetLogin(l);
                done();
            }
        ).submit();
    });
    it("should throw an error username and password are incorrect", function(done){
        this.timeout(10000);
        $('#login_username').val('testuser');
        $('#login_password').val('testpassword');
        var l = getLogin();
        l.form.on(
            'error', 
            function(e, d){
                assert.equal(d.message, 'BAD REQUEST');
                resetLogin(l);
                done();
            }
        ).submit();
    });
    it("should blur all inputs", function(){
        var l = getLogin();
        l.blurAll();
        //resetLogin(l);
    });
}); // end Login
