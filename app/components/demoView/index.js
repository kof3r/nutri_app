/**
 * Created by gordan on 10.05.16..
 */

module.exports = {
    template: require('./template.html'),
    controller: require('./controller'),
    bindings: {
        recipes: '<',
        recipeTable: '<',
        recipeForm: '<',
        ingredientTable: '<',
        ingredientForm: '<'
    }
};