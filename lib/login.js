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
        
    
    // extend all options passed in to this
    $.extend(this, opts);
    
    // hold input types/classes
    this.inputs = {};

    this.set();
    
    return this;
    
};

// set login form
Login.prototype.set = function(){
    this.form.find('input').each(
        $.proxy(function(i, el){
            var name = $(el).attr('name');
            if(name){
                this.inputs[name] = $(el);
            }
        }, this)
    );
    if(this.focus){
        $(this.focus).focus();
    }
    this.form.on('submit', $.proxy(this.onSubmit, this));
};

// login submission
Login.prototype.onSubmit = function(e){
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
    this.form.on('submit', $.proxy(this.onEmptySubmit, this));
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

// ajax response
Login.prototype.onResponse = function(jqXhr){
    $(this.form).off('submit');
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

// make sure we have values
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

// blur all inputs
Login.prototype.blurAll = function(){
    $.each(
        this.inputs,
        function(i, el){
            $(el).blur();
        }
    );
};

// dummy submit listener. Return false so browser doesn't refresh
Login.prototype.onEmptySubmit = function(e){
    return false;
}

// trigger error
Login.prototype.triggerSuccess = function(response){
    $(this.form).triggerHandler(
        'success',
        {
            'response': response
        } 
    );
};

// trigger error
Login.prototype.triggerError = function(message){
    $(this.form).triggerHandler(
        'error',
        {
            'message': message
        } 
    );
};


module.exports = Login;

}());