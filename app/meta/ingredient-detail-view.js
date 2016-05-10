/**
 * Created by ggrab on 13.3.2016..
 */

module.exports = ['detailViewConstructor', 'formFieldConstructor', '$timeout', function(DetailView, FormField, $timeout){

        return new DetailView({

            name: new FormField().labelAs('Name').asText(),
            amount: new FormField().labelAs('Amount').asNumber(0.1).displayAs(function() { return this.measure; }),
            // measure: new FormField().labelAs('Measure').asEnum(['mass', 'volume', 'quantity']),
            measure: new FormField().labelAs('Measure').asEnum(() => ($timeout(() => ['mass', 'volume', 'quantity'], 1000))),
            caloriesNominal: new FormField().labelAs('Nominal').displayAs('energy'),
            carbs: new FormField().labelAs('Carbs').asNumber(0.1).displayAs('mass'),
            fats: new FormField().labelAs('Fats').asNumber(0.1).displayAs('mass'),
            protein: new FormField().labelAs('Protein').asNumber(0.1).displayAs('mass'),
            totalCalories: new FormField().labelAs('Total calories').displayAs('energy'),
            totalCarbs: new FormField().labelAs('Total carbs').displayAs('mass'),
            totalFats: new FormField().labelAs('Total fats').displayAs('mass'),
            totalProtein: new FormField().labelAs('Total protein').displayAs('mass')

        });

}]
