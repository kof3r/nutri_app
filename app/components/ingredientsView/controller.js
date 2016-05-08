/**
 * Created by gordan on 08.05.16..
 */

module.exports = ['$scope', function($scope) {
    
    $scope.recipes = this.recipes;
    $scope.ingredients = [];

    $scope.setIngredients = function(ingredients) {
        console.log(ingredients);
        $scope.ingredients.splice(0);
        angular.copy(ingredients, $scope.ingredients);
    }
    
}];