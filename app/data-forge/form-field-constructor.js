/**
 * Created by gordan on 10.04.16..
 */

module.exports = function(){

    function FormField(){

        this.validators = [];

    }

    FormField.prototype.labelAs = function(label){
        this.field = label;
        return this;
    }

    FormField.prototype.ofType = function(type){
        this.type = type;
        return this;
    }

    FormField.prototype.withStep = function(step){
        this.step = step;
        return this;
    }

    FormField.prototype.displayAs = function(filter){
        this.filter = filter;
        return this;
    }

    FormField.prototype.Self = function(reflect){
        this.reflect = reflect;
        return this;
    }

    FormField.prototype.validate = function(validator, message){
        this.validators.push({validator: validator, message: message});
        return this;
    }

    return FormField;

}