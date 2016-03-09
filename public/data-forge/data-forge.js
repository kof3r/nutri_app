/**
 * Created by ggrab on 2.3.2016..
 */

//TODO: reflect = function(self, sve_druge);

angular.module('dataForge', ['dataForge_util'])

    .factory('dataForge', ['formField', 'tableColumn', 'dataForge_registry', function(FormField, TableColumn, registry){

        return {

            TableColumn: function() {
                return new TableColumn();
            },

            registerTableView: function(name, definition){
                registry.registerTableView(name, definition);
            },

            FormField: function(){
                return new FormField();
            },

            registerDetailView: function(name, definition){
                registry.registerDetailView(name, definition);
            },

            registerDataModel: function(name, dataModel){
                registry.registerDataModel(name, dataModel);
            },
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

        TableColumn.prototype.alignTo = function(align){
            this.align = align;
            return this;
        }

        return TableColumn;

    });