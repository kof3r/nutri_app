/**
 * Created by ggrab on 2.3.2016..
 */

//TODO: reflect = function(self, sve_druge);

angular.module('dataForge', ['dataForgeUtilities'])

    .factory('dataForge', ['formField', 'tableColumn', function(FormField, TableColumn){

        var tableViewDefinitions = Object.create(null);
        var detailViewDefinitions = Object.create(null);
        var dataModels = Object.create(null);

        return{

            TableColumn: function() {
                return new TableColumn();
            },

            registerTableView: function(name, definition){
                tableViewDefinitions[name] = angular.copy(definition);
            },

            tableViewDefinition: function(name){
                return tableViewDefinitions[name];
            },

            FormField: function(){
                return new FormField();
            },

            registerDetailView: function(name, definition){
                detailViewDefinitions[name] = angular.copy(definition);
            },

            detailViewDefinition: function(name){
                return detailViewDefinitions[name];
            },

            registerDataModel: function(name, dataModel){
                dataModels[name] = dataModel;
            },

            dataModel: function(name){
                return dataModels[name];
            }
        }
    }])

    .factory('formField', function(){

        function FormField(){ }

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

        return FormField;

    })

    .factory('tableColumn', function(){

        function TableColumn(){
            this.align = 'left';
        }

        TableColumn.prototype.withHeader = function(header){
            this.header = header;
            return this;
        }

        TableColumn.prototype.displayAs = function(filter){
            this.filter = filter;
            return this;
        }

        TableColumn.prototype.align = function(align){
            this.align = align;
            return this;
        }

        return TableColumn;

    });