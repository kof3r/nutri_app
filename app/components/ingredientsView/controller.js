/**
 * Created by gordan on 08.05.16..
 */

module.exports = ['$scope', function($scope) {

    const ingredientService = this.service;

    $scope.recipes = this.recipes;
    $scope.selectedRecipe = null;
    
    $scope.ingredients = [];
    $scope.selectedIngredients = [];

    $scope.$watch('selectedRecipe', (value) => {
        $scope.ingredients.splice(0);
        if(value){
            setIngredients(value);
        }
    });

    $scope.deleteClicked = function() {
        const currentlySelectedRecipe = $scope.selectedRecipe;
        Promise.all($scope.selectedIngredients.map((ingredient) => ingredientService.delete(ingredient.id).then((deleted) => {
            if(deleted && currentlySelectedRecipe) {
                currentlySelectedRecipe.removeIngredient(ingredient);
                $scope.ingredients.splice(0);
                setIngredients(currentlySelectedRecipe);
            }
        })))
    };

    $scope.selectedItemsChanged = function(items) {
        $scope.selectedIngredients.splice(0);
        angular.copy(items, $scope.selectedIngredients);
    };

    $scope.selectRecipe = function(recipe) {
        if($scope.selectedRecipe === recipe){
            $scope.selectedRecipe = null;
        } else {
            $scope.selectedRecipe = recipe;
        }
    };

    function setIngredients(recipe) {
        angular.copy(recipe.ingredients, $scope.ingredients);
    }

}];