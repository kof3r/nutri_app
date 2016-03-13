/**
 * Created by ggrab on 9.3.2016..
 */

angular.module('dataForge')
    .factory('dataForge_registry', [function(){

        var validators = Object.create(null);

        return {

            registerValidator: function(name, validator){
                validators[name] = validator;
            },

            validator: function(name){
                return validators[name];
            }
        }

    }])
