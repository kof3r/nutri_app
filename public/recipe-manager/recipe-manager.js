/**
 * Created by ggrab on 24.2.2016..
 */

function controller($scope, recipeSvc, util){

    this.$onInit = function(){

        var recipes = $scope.recipes = [];
        var selected = $scope.selectedRecipes = [];

        recipeSvc.get().then(function(recipes){
            angular.forEach(recipes, function(recipe){
                addRecipe(recipe);
            })
        });

        $scope.addToSelected = function(recipe){
            selectRecipe(recipe);
        }

        $scope.removeFromSelected = function(recipe){
            deselectRecipe(recipe);
        }

        $scope.clearSelection = function(){
            clearSelection();
        }

        $scope.selectAll = function(){
            $scope.selectedRecipes = $scope.recipes.slice(0, $scope.recipes.length);
        }

        $scope.deleteSelected = function(){

            Promise.all(selected.map(function(recipe){
                return recipeSvc.delete(recipe.id).then(function(){
                    removeRecipe(recipe);
                }).catch();
            }))
        }

        $scope.onNewClick = function(){
            if(selected.length > 1){
                clearSelection();
            }
            $scope.inputEnabled = true;
        }

        $scope.onSaveClick = function(recipe){
            if(recipe.id){
                var old = selected[0];
                recipeSvc.post(recipe).then(function(recipe){
                    removeRecipe(old);
                    addRecipe(recipe);
                    selectRecipe(recipe);
                }).catch(function(){

                })
            } else {
                recipeSvc.put(recipe).then(function(recipe){
                    $scope.recipes.push(recipe);
                });
            }
        }

        $scope.onCancelClick = function(){
            $scope.inputEnabled = false;
        }

        function removeRecipe(recipe){
            util.removeFromArray(recipes, recipe);
            util.removeFromArray(selected, recipe);
        }

        function addRecipe(recipe){
            recipes.push(recipe);
        }

        function selectRecipe(recipe){
            selected.push(recipe);
        }

        function deselectRecipe(recipe){
            util.removeFromArray(selected, recipe);
        }

        function clearSelection(){
            $scope.selectedRecipes.splice(0, $scope.selectedRecipes.length);
        }
    }

}

angular.module('recipeManager', ['server', 'util'])
    .component('recipeManager', {
        templateUrl: 'recipe-manager/recipe-manager.html',
        controller: ['$scope', 'serverRecipeService', 'util', controller]
    })
