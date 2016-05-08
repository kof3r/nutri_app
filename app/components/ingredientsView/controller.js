/**
 * Created by gordan on 08.05.16..
 */

module.exports = ['$scope', function($scope) {
    
    $scope.recipes = this.recipes;
    $scope.selectedRecipe = null;
    
    $scope.ingredients = [];
    $scope.selectedIngredients = [];

    $scope.$watch('selectedRecipe', (value) => {
        $scope.ingredients.splice(0);
        if(value) {
            angular.copy(value.ingredients, $scope.ingredients);
        }
    });

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
    }
    
}];