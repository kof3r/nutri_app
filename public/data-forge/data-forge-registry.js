/**
 * Created by ggrab on 9.3.2016..
 */

angular.module('dataForge')
    .factory('dataForge_registry', function(){

        var tableViewDefinitions = Object.create(null);
        var detailViewDefinitions = Object.create(null);
        var dataModels = Object.create(null);

        return {

            registerTableView: function(name, definition){
                tableViewDefinitions[name] = angular.copy(definition);
            },

            tableViewDefinition: function(name){
                return angular.copy(tableViewDefinitions[name]);
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
            }
        }

    })
