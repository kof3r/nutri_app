/**
 * Created by gordan on 17.04.16..
 */

module.exports = ['$scope', 'recipeService', function($scope, service){

    $scope.items = [];
    $scope.selected = [];
    $scope.item = null;
    disableInput();

    service.get().then((items) => $scope.items = items);

    $scope.$watchCollection('items', () => {
        $scope.selected.splice();
    });
    
    $scope.$watchCollection('selected', function handleSelectedItemChanged(){
        if($scope.selected.length === 1){
            $scope.item = $scope.selected[0];
        } else {
            $scope.item = null;
        }
    });

    $scope.cancelInput = function() {
        disableInput();
    };

    $scope.deleteRecipes = function(){
        Promise.all($scope.selected.map((recipe) => service.delete(recipe.id).then((deleted) => {
            if(deleted) {
                removeFromRecipes(recipe);
            }
        } )));
    };

    $scope.editClicked = function() {
        enableInput();
    };

    $scope.newClicked = function() {
        enableInput();
    };
    
    $scope.onSelectedItemsChanged = function(items){
        $scope.selected.splice();
        angular.copy(items, $scope.selected);
    };

    $scope.saveRecipe = function(recipe) {
        disableInput();
        if(!recipe.id){
            service.put(recipe).then((recipe) => {
                $scope.items.push(recipe);
            });
        } else {
            service.post(recipe).then((edited) => {
                edited.ingredients = recipe.ingredients;
                removeFromRecipes(recipe);
                $scope.items.push(edited);
            })
        }
    };

    function enableInput() {
        $scope.inputting = true;
    }

    function disableInput() {
        $scope.inputting = false;
    }

    function removeFromRecipes(recipe){
        let i = $scope.items.findIndex((r) => r.id === recipe.id);
        if(i !== -1) {
            $scope.items.splice(i, 1);
        }
    }

}]