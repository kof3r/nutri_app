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
        }
    }
    
    class Slider{
        constructor(label, type) {
            this.field = label;
            this.type = type;
            this.template = 'df-form-slider.html';
        }
    }
    
    return {
        TextInput: TextInput,
        NumberInput: NumberInput,
        Enum: Enum,
        Slider: Slider
    };
    
}];