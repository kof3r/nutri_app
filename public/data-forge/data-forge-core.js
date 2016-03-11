/**
 * Created by ggrab on 11.03.2016..
 */

angular.module('dataForge')
    .run(['dataForge_registry', function(registry){

        registry.registerValidator('required', function(modelValue, viewValue){
            if(this.$isEmpty(modelValue)){
                return false;
            }
            return true;
        });

        registry.registerValidator('range', function(){

            var from = parseFloat(arguments[1]);
            var to = parseFloat(arguments[2]);

            return function(modelValue, viewValue){
                if(this.$isEmpty(modelValue)){
                    return true;
                }
                if((from === 0 || from) && viewValue < from){
                    return false;
                }
                if((to === 0 || to) && to < viewValue){
                    return false;
                }
                return true;
            }.bind(this);

        })

    }]);