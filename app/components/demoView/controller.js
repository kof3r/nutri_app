/**
 * Created by gordan on 10.05.16..
 */

module.exports = ['$scope', function($scope) {

    $scope.recipes = this.recipes;
    $scope.selectedRecipes = [];
    $scope.selectedRecipe = null;
    $scope.ingredients = [];
    $scope.selectedIngredients = [];
    $scope.selectedIngredient = null;

    $scope.selectedRecipesChanged = function (selected) {
        $scope.selectedRecipes.splice(0);
        $scope.ingredients.splice(0);
        angular.copy(selected, $scope.selectedRecipes);
        if($scope.selectedRecipes.length === 1) {
            $scope.selectedRecipe = $scope.selectedRecipes[0];
            angular.copy($scope.selectedRecipe.ingredients, $scope.ingredients);
        } else {
            $scope.selectedRecipe = null;
        }
    };

    $scope.selectedIngredientsChanged = function(selected) {
        $scope.selectedIngredients.splice(0);
        angular.copy(selected, $scope.selectedIngredients);
        if($scope.selectedIngredients.length === 1) {
            $scope.selectedIngredient = $scope.selectedIngredients[0];
        } else {
            $scope.selectedIngredient = null;
        }
    };

}];