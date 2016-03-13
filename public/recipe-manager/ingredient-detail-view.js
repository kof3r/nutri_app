/**
 * Created by ggrab on 13.3.2016..
 */

angular.module('recipeManager')

    .factory('ingredientDetailView', ['detailViewConstructor', 'formFieldConstructor', function(DetailView, FormField){

        return new DetailView({

            name: new FormField().labelAs('Name').ofType('text')
                .validate('required', 'Name is required.'),
            amount: new FormField().labelAs('Amount').ofType('number').withStep(0.1).displayAs(function() { return this.measure; })
                .validate('range:0', 'Positive values only.'),
            measure: new FormField().labelAs('Measure').ofType(['mass', 'volume', 'quantity'])
                .validate('required', 'Please choose a measure.'),
            caloriesNominal: new FormField().labelAs('Nominal').displayAs('energy'),
            carbs: new FormField().labelAs('Carbs').ofType('number').withStep(0.1).displayAs('mass')
                .validate('range:0:100', '[0 - 100]'),
            fats: new FormField().labelAs('Fats').ofType('number').withStep(0.1).displayAs('mass')
                .validate('range:0:100', '[0 - 100]'),
            protein: new FormField().labelAs('Protein').ofType('number').withStep(0.1).displayAs('mass')
                .validate('range:0:100', '[0 - 100]')

        });

    }])
