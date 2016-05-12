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

    $scope.getRecipes = function(query) {
        return self.recipeSvc.get(query);
    };

    $scope.getIngredients = function(query) {
        return self.ingredientSvc.get(query);
    };

    $scope.deleteRecipe = function(recipe) {
        return self.recipeSvc.delete(recipe.id);
    };

    $scope.deleteIngredient = function(ingredient) {
        return self.ingredientSvc.delete(ingredient.id);
    };

}];
