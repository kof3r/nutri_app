/**
 * Created by ggrab on 9.3.2016..
 */

angular.module('dataForge')
    .factory('dataForge_registry', ['dataForge_tableViewDefaults', function(tableViewDefaults){

        var tableViewDefinitions = Object.create(null);
        var detailViewDefinitions = Object.create(null);
        var dataModels = Object.create(null);
        var validators = Object.create(null);

        return {

            tableViewDefaults: function(){
                return angular.copy(tableViewDefaults);
            },

            registerTableView: function(name, definition){
                tableViewDefinitions[name] = angular.copy(definition);
            },

            tableViewDefinition: function(name){
                return angular.copy(tableViewDefinitions[name]);
            },

            detailViewDefaults: function(){

            },

            registerDetailView: function(name, definition){
                detailViewDefinitions[name] = angular.copy(definition);
            },

            detailViewDefinition: function(name){
                return angular.copy(detailViewDefinitions[name]);
            },

            registerDataModel: function(name, dataModel){
                dataModels[name] = dataModel;
            },

            dataModel: function(name){
                return dataModels[name];
            },

            registerValidator: function(name, validator){
                validators[name] = validator;
            },

            validator: function(name){
                return validators[name];
            }
        }

    }])
