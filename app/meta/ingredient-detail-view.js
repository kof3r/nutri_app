/**
 * Created by ggrab on 13.3.2016..
 */

module.exports = ['detailViewConstructor', 'formFieldConstructor', '$timeout', '$http', function(DetailView, FormField, $timeout, $http){

    return new DetailView({

        name: new FormField().labelAs('Name').asText(),
        amount: new FormField().labelAs('Amount').asNumber(0.1).displayAs(function() { return this.measure; }),
        // measure: new FormField().labelAs('Measure').asEnum(['mass', 'volume', 'quantity']),
        measure: new FormField().labelAs('Measure').asEnum(() => ($timeout(() => ['mass', 'volume', 'quantity'], 2000))),
        // measure: new FormField().labelAs('Countries').asEnum(countries),
        caloriesNominal: new FormField().labelAs('Nominal').displayAs('energy'),
        carbs: new FormField().labelAs('Carbs').asNumber(0.1).displayAs('mass'),
        fats: new FormField().labelAs('Fats').asNumber(0.1).displayAs('mass'),
        protein: new FormField().labelAs('Protein').asNumber(0.1).displayAs('mass'),
        totalCalories: new FormField().labelAs('Total calories').displayAs('energy'),
        totalCarbs: new FormField().labelAs('Total carbs').displayAs('mass'),
        totalFats: new FormField().labelAs('Total fats').displayAs('mass'),
        totalProtein: new FormField().labelAs('Total protein').displayAs('mass')

    });

    function countries() {
        return $http.get('https://restcountries.eu/rest/v1/all').then((res) => {
            return res.data.map((c) => c.name);
        })
    }

}]