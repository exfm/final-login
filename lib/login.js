(function(){

"use strict";

// constructor
function Login(form, opts){

    if(!form){
        throw new TypeError("A form is required");
        return;
    }
    
    this.form = $(form);

    // ajax type
    this.ajaxType = 'POST'; 
    
    var formIds = {
        'username': '#login_username',
        'password': '#login_password'
    }
    
    this.formIds = $.extend(formIds, opts.formIds);
    
    // extend all options passed in to this
    $.extend(this, opts);
    
    // hold input types/classes
    this.inputs = {};

    this.set();
    
    return this.form;
    
};

// set login form
Login.prototype.set = function(){
    for(var i in this.formIds){
        this.inputs[i] = this.form.find(this.formIds[i]);  
    }
    if(this.focus){
        $(this.focus).focus();
    }
    this.form.on('submit', $.proxy(this.onSubmit, this));
};

// login submission
Login.prototype.onSubmit = function(){
    var data = {};
    for(var i in this.inputs){
        var val = this.inputs[i].val();
        if(this.validate(val) === false){
            this.triggerError(i+' cannot be empty');
            return false;
        }
        else{
            data[i] = $.trim(val);
        }
    }
    if(!this.url){
        this.triggerError('Must provide a url');
        return false;
    }
    $(this.form).off('submit');
    if(this.buttonSubmitClass && this.submitButton){
        $(this.submitButton).addClass(this.buttonSubmitClass);
    }
    $.ajax({
        'type': this.ajaxType,
        'url': this.url,
        'cache': false,
        'data': data,
        'complete': $.proxy(this.onResponse, this)
    });
    return false;
};

Login.prototype.onResponse = function(jqXhr){
    if(this.buttonSubmitClass && this.submitButton){
        $(this.submitButton).removeClass(this.buttonSubmitClass);
    }
    if(jqXhr.status === 200){
        this.triggerSuccess(JSON.parse(jqXhr.responseText)); 
    }
    else{
        this.form.on('submit', $.proxy(this.onSubmit, this));
        this.triggerError(jqXhr.statusText); 
    }
};


Login.prototype.validate = function(s){
    if (s === undefined){
        return false;
    }
    if (s === ""){
        return false;
    }
    if (s === null){
        return false;
    }
    return true;
};

// trigger error
Login.prototype.triggerSuccess = function(response){
    $(this.form).trigger(
        'success',
        {
            'response': response
        } 
    );
};

// trigger error
Login.prototype.triggerError = function(message){
    $(this.form).trigger(
        'error',
        {
            'message': message
        } 
    );
};


module.exports = Login;

}());