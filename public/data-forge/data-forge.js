/**
 * Created by ggrab on 2.3.2016..
 */

//TODO: reflect = function(self, sve_druge);

angular.module('dataForge', ['dataForge_util', 'dataForge_directives'])

    .factory('dataForge', ['dataForge_registry', function(registry){

        return {
            registerValidator: function(name, validator){
                registry.registerValidator(name, validator);
            },

            registerDataModel: function(name, dataModel){
                registry.registerDataModel(name, dataModel);
            },
        }
    }]);