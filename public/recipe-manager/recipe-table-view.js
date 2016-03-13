/**
 * Created by ggrab on 13.3.2016..
 */

angular.module('recipeManager')
    .factory('recipeTableView', ['tableViewConstructor', 'tableColumnConstructor', function(TableView, TableColumn){

        return new TableView({

            name: new TableColumn().withHeader('Name'),
            totalCalories: new TableColumn().withHeader('Calories').displayAs('energy').alignTo('right')

        });

    }])
