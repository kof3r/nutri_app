/**
 * Created by gordan on 10.05.16..
 */

module.exports = {
    template: require('./template.html'),
    bindings: {
        recipes: '<',
        recipeSvc: '<',
        ingredientSvc: '<',
        recipeTable: '<',
        recipeForm: '<',
        ingredientTable: '<',
        ingredientForm: '<'
    }
};