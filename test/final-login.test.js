"use strict";

var Authenticate = require('../index.js'),
    login = Authenticate.login;

describe("final-login", function(){
    it("should have at least one test", function(){
    
        
        var l = new login('#login_form',
            {
                'url': 'http://ex.fm/api/v3/authenticate',
                'buttonSubmitClass': 'submitting',
                'submitButton': '#login_button',
                'focus': '#login_username'
            }
        ).on(
            'success', 
            function(e, d){
                console.log('success', e, d);
            }
        ).on(
            'error', 
            function(e, d){
                console.log('error', e, d);
            }
        ); 
       
      
            
        
        
        
        assert.equal(1, 1);
    });
});