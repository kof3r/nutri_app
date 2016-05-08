/**
 * Created by gordan on 17.04.16..
 */

module.exports = ['$scope', '$state', 'recipeService', function($scope, $state, service){

    $scope.items = [];
    $scope.selected = [];
    $scope.item = null;

    service.get().then((recipes) => {
        angular.copy(recipes, $scope.items);
    });

    $scope.$watchCollection('selected', () => {
        if($scope.selected.length === 1) {
            $scope.item = $scope.selected[0];
        } else {
            $scope.item = null;
        }
    });

    $scope.deleteRecipes = function(){
        Promise.all($scope.selected.map((recipe) => service.delete(recipe.id).then((deleted) => {
            if(deleted) {
                removeFromRecipes(recipe);
            }
        } )));
    };
    
    $scope.onSelectedItemsChanged = function(items){
        $scope.selected.splice(0);
        angular.copy(items, $scope.selected);
    };

    function removeFromRecipes(recipe){
        const i = $scope.items.findIndex((r) => r.id === recipe.id);
        if(i !== -1) {
            $scope.items.splice(i, 1);
        }
    }

}]