/**
 * Created by gordan on 17.04.16..
 */

module.exports = ['$scope', '$state', 'recipeService', function($scope, $state, service){

    $scope.items = [];
    $scope.selected = [];
    $scope.item = null;
    disableInput();

    service.get().then((recipes) => {
        angular.copy(recipes, $scope.items);
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
    
    $scope.onSelectedItemsChanged = function(items){
        console.log('echi')
        $scope.selected.splice();
        angular.copy(items, $scope.selected);
        console.log($scope.selected);
        if($scope.selected.length === 1){
            $scope.item = $scope.selected[0];
        } else {
            $scope.item = null;
        }
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
        const i = $scope.items.findIndex((r) => r.id === recipe.id);
        if(i !== -1) {
            $scope.items.splice(i, 1);
        }
    }

}]