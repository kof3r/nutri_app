/**
 * Created by ggrab on 13.3.2016..
 */

angular.module('dataForge')
    .factory('tableViewConstructor', function(){

        function TableView(options, columns)
        {
            this.columns = angular.copy(arguments.length === 1 ? options : columns);

            this.options = angular.copy(options);
        }

        TableView.prototype.disabledButtonStyle = { 'background-color': 'lightgrey', border: 'none'};

        TableView.prototype.disabledTableRowStyle = { 'background-color': 'lightgrey', color: 'black' };

        TableView.prototype.selectedTableRowStyle = { 'background-color': 'chocolate', color:'white' };

        TableView.prototype.newItemStyle = { color: 'green'};

        TableView.prototype.dirtyItemStyle = { color: 'orange'};

        return TableView;

    })

    .factory('tableColumnConstructor', function(){

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

        TableColumn.prototype.Self = function(reflect){
            this.reflect = reflect;
            return this;
        }

        TableColumn.prototype.alignTo = function(align){
            this.align = align;
            return this;
        }

        TableColumn.prototype.class = function(_class){
            this._class = _class;
            return this;
        }

        return TableColumn;

    })
