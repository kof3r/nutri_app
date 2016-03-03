/**
 * Created by ggrab on 1.3.2016..
 */

angular.module('data')

    .factory('recipeFormFields', ['formFieldConstructor', 'filters', function(FormField, filters){
        return {
            name: new FormField('Name', 'text'),
            totalCalories: new FormField('Calories', undefined, 'energy'),
            totalCarbs: new FormField('Carbs', undefined, 'mass'),
            totalFats: new FormField('Fats', undefined, 'mass'),
            totalProtein: new FormField('Protein', undefined, 'mass'),
            created_at: new FormField('Created', undefined, 'date')
        }
    }])
