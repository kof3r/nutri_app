/**
 * Created by gordan on 13.05.16..
 */

module.exports = [function() {
    
    class TextInput{
        constructor(label) {
            this.field = label;
            this.type = 'text';
            this.template = 'text-input.html';
        }
    }

    class NumberInput{
        constructor(label, step) {
            this.field = label;
            this.type = 'number';
            this.step = step;
            this.template = 'text-input.html';
        }
    }
    
    class Enum{
        constructor(label, values) {
            this.field = label;
            this.template = 'select.html';
            this.resolve = function () {
                if(angular.isArray(values)) {
                    return Promise.resolve(values);
                } else {
                    return values();
                }
            };
        }
    }
    
    class Slider{
        constructor(label, type) {
            this.field = label;
            this.type = type;
            this.template = 'df-form-slider.html';
        }
    }

    class Date{
        constructor(label) {
            this.field = label;
            this.template = 'df-date-picker.html';
        }
    }
    
    return {
        Date: Date,
        TextInput: TextInput,
        NumberInput: NumberInput,
        Enum: Enum,
        Slider: Slider
    };
    
}];