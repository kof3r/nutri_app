/**
 * Created by gordan on 13.05.16..
 */

module.exports = ['$scope', function($scope) {

    const self = this;

    $scope.saveRecipe = function(recipe) {
        if(recipe.id) {
            return self.recipeSvc.post(recipe);
        } else {
            return self.recipeSvc.put(recipe);
        }
    };

    $scope.saveIngredient = function(ingredient) {
        if(ingredient.id) {
            return self.ingredientSvc.post(ingredient);
        } else {
            return self.ingredientSvc.put(ingredient);
        }
    };

}];