/**
 * Created by ggrab on 9.3.2016..
 */

module.exports = function(){

        var validators = Object.create(null);

        return {

            registerValidator: function(name, validator){
                validators[name] = validator;
            },

            validator: function(name){
                return validators[name];
            }
        }

}