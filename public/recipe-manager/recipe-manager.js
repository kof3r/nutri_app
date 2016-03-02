/**
 * Created by ggrab on 24.2.2016..
 */

function controller($scope, recipeSvc, util){

    var ctrl = this;

    this.$onInit = function(){

        var recipes = $scope.recipes = [];
        var selected = $scope.selectedRecipes = [];

        util.wireEvents($scope, ctrl.deselectAllOn, clearSelection);

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

        $scope.deselectAll = function(){
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

        $scope.saveRecipe = function(item){
            if(item.id){
                var old = selected[0];
                recipeSvc.post(item).then(function(recipe){
                    removeRecipe(old);
                    addRecipe(recipe);
                    selectRecipe(recipe);
                }).catch(function(){

                })
            } else {
                recipeSvc.put(item).then(function(recipe){
                    addRecipe(recipe);
                    selectRecipe(recipe);
                });
            }
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
            $scope.$broadcast('recipeSelected');
        }

        function deselectRecipe(recipe){
            util.removeFromArray(selected, recipe);
            $scope.$broadcast('recipeDeselected');
        }

        function clearSelection(){
            $scope.selectedRecipes.splice(0, $scope.selectedRecipes.length);
            $scope.$broadcast('recipeDeselected');
        }
    }

}

angular.module('recipeManager', ['server', 'util', 'data'])

    .component('recipeManager', {
        templateUrl: 'recipe-manager/recipe-manager.html',
        controller: ['$scope', 'serverRecipeService', 'util', controller],
        bindings:{
            deselectAllOn:'<'
        }
    })

    .factory('formFields', ['recipeFormFields', function(recipe){
        return{
            recipe: recipe
        }
    }])
