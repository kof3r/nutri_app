/**
 * Created by ggrab on 2.3.2016..
 */

angular.module('data', ['nutrition', 'dataForgeUtilities'])

    .factory('filters', ['dateFilter', 'energyFilter', 'massFilter', function(date, energy, mass){
        return {
            date: date,
            energy: energy,
            mass: mass
        };
    }])

    .factory('formField', ['filters', function(filters){

        function FormField(field, type, filter){
            this.field = field;
            this.type = type;
            this.filter = filters[filter];
        }

        return FormField;

    }])
    .factory('tableColumn', ['filters', function(filters){

        function TableColumn(header, filter, align){
            this.header = header;
            this.filter = filters[filter];
            this.align = align;
        }

        return TableColumn;

    }]);