/**
 * Created by gordan on 17.04.16..
 */

module.exports = ['$scope', 'serverRecipeService', function($scope, service){

    $scope.items = [];
    $scope.selected = [];
    $scope.item = null;
    $scope.inputting = false;

    service.get().then((items) => $scope.items = items);
    
    $scope.$watchCollection('selected', function handleSelectedItemChanged(){
        if($scope.selected.length === 1){
            $scope.item = $scope.selected[0];
        } else {
            $scope.item = null;
        }
    });

    $scope.cancelInput = function() {
        $scope.inputting = false;
    };

    $scope.newClicked = function() {
        $scope.inputting = true;
    };
    
    $scope.onSelectedItemsChanged = function(items){
        $scope.selected.splice();
        angular.copy(items, $scope.selected);
    };

    $scope.saveRecipe = function(recipe) {
        $scope.inputting = false;
        
    };

}]