"use strict";

var Login = require('./lib/login');

module.exports.login = function(form, opts){
    return new Login(form, opts);  
};
    
