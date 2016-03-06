/**
 * Created by ggrab on 2.3.2016..
 */

angular.module('data')
    .factory('ingredientFormFields', ['formField', function(FormField){

        return{
            name: new FormField('Name', 'text'),
            amount: new FormField('Amount', 'number', 'mass'),
            caloriesNominal: new FormField('Nominal', undefined, 'energy'),
            carbs: new FormField('Carbs', 'number', 'mass'),
            fats: new FormField('Fats', 'number', 'mass'),
            protein: new FormField('Protein', 'number', 'mass')
        }

    }])
