/**
 * Created by ggrab on 13.3.2016..
 */

module.exports = function(){

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

};