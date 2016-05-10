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
    };
    
    FormField.prototype.asText = function() {
        this.type = 'text';
        this.template = 'text-input.html';
        return this;
    };

    FormField.prototype.asNumber = function(step) {
        this.type = 'number';
        this.step = step;
        this.template = 'number-input.html';
        return this;
    };

    FormField.prototype.asEnum = function(values) {
        this.type = 'enum';
        this.template = 'select.html';
        if(angular.isArray(values)){
            this.enum = values;
        } else {
            this.resolve = function() {
                values().then((resolved) => {
                    this.enum = resolved;
                });
            }
        }
        return this;
    };
    
    FormField.prototype.asSlider = function(type) {
        this.type = type;
        this.template = 'df-form-slider.html';
        return this;
    };

    FormField.prototype.displayAs = function(filter){
        this.filter = filter;
        return this;
    };

    return FormField;

}