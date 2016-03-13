/**
 * Created by ggrab on 13.3.2016..
 */

angular.module('recipeManager')
    .factory('ingredientTableView', ['tableViewConstructor', 'tableColumnConstructor', function(TableView, TableColumn){

        return new TableView({

            name: new TableColumn().withHeader('Name'),
            amount: new TableColumn().withHeader('Amount').displayAs(function() { return this.measure; }).alignTo('right'),
            totalCalories: new TableColumn().withHeader('Total calories').displayAs('energy').alignTo('right'),
            totalCarbs: new TableColumn().withHeader('Total carbs').displayAs('mass').alignTo('right'),
            totalFats: new TableColumn().withHeader('Total fats').displayAs('mass').alignTo('right'),
            totalProtein: new TableColumn().withHeader('Total protein').displayAs('mass').alignTo('right')

        });

    }])