/**
 * Created by ggrab on 2.3.2016..
 */

angular.module('data')
    .factory('ingredientListColumns', ['tableColumn', function(TableColumn){
        return {
            name: new TableColumn('Name'),
            totalCalories: new TableColumn('Total calories', 'energy', 'right'),
            totalCarbs: new TableColumn('Total carbs', 'mass', 'right'),
            totalFats: new TableColumn('Total fats', 'mass', 'right'),
            totalProtein: new TableColumn('Total protein', 'mass', 'right')
        }
    }])