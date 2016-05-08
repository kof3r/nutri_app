/**
 * Created by gordan on 08.05.16..
 */

module.exports = ['$scope', function($scope) {
    
    $scope.recipes = this.recipes;
    $scope.selected = null;
    $scope.ingredients = [];

    $scope.$watch('selected', (value) => {
        $scope.ingredients.splice(0);
        if(value) {
            angular.copy(value.ingredients, $scope.ingredients);
        }
    });

    $scope.selectRecipe = function(recipe) {
        if($scope.selected === recipe){
            $scope.selected = null;
        } else {
            $scope.selected = recipe;
        }
    }
    
}];