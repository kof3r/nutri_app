/**
 * Created by ggrab on 13.3.2016..
 */

module.exports = ['detailViewConstructor', 'formFieldConstructor', function(DetailView, FormField){

        return new DetailView({
            name: new FormField().labelAs('Name').ofType('text')
                .validate('required', 'Name is required.'),
            totalCalories: new FormField().labelAs('Calories').displayAs('energy'),
            totalCarbs: new FormField().labelAs('Carbs').displayAs('mass'),
            totalFats: new FormField().labelAs('Fats').displayAs('mass'),
            totalProtein: new FormField().labelAs('Protein').displayAs('mass')
        });

}]