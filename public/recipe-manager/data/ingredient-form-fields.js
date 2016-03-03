/**
 * Created by ggrab on 2.3.2016..
 */

angular.module('data')
    .factory('ingredientFormFields', ['formFieldConstructor', function(FormField){

        return{
            name: new FormField('Name', 'text'),
            amount: new FormField('Amount', 'number', 'mass'),
            carbs: new FormField('Carbs', 'number', 'mass'),
            fats: new FormField('Fats', 'number', 'mass'),
            protein: new FormField('Protein', 'number', 'mass'),
            totalCalories: new FormField('Calories', undefined, 'energy')
        }

    }])
