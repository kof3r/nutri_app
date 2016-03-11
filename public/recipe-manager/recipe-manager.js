/**
 * Created by ggrab on 24.2.2016..
 */

angular.module('recipeManager', ['server', 'util', 'dataForge', 'nutrition'])

    .component('recipeManager', {
        templateUrl: 'recipe-manager/recipe-manager.html',
        controller: ['$scope', '$window', '$timeout', 'serverRecipeService', 'serverIngredientService', controller]
    })

function controller($scope, $window, $timeout, recipeSvc, ingredientService){

    this.$onInit = function(){

        $scope.recipes = [];
        $scope.selectedRecipes = [];
        $scope.ingredients = [];
        $scope.selectedIngredients = [];

        var inputtingIngredient = false;

        (function registerWatches(){

            $scope.$watchCollection('selectedRecipes', function handleSelectedRecipesChange(){
                if($scope.selectedRecipes.length === 1){
                    $scope.ingredients = getSelectedRecipe().ingredients;
                } else {
                    $scope.ingredients = [];
                }
            });

        })();

        (function wireEvents(){

            $scope.$on('recipeSelected', itemSelectedHandler('selectedRecipes'));

            $scope.$on('recipeDeselected', itemDeselectedHandler('selectedRecipes'));

            $scope.$on('selectedRecipesChanged', selectedItemsChangedHandler('selectedRecipes'));


            $scope.$on('ingredientSelected', itemSelectedHandler('selectedIngredients'));

            $scope.$on('ingredientDeselected', itemDeselectedHandler('selectedIngredients'));

            $scope.$on('selectedIngredientsChanged', selectedItemsChangedHandler('selectedIngredients'));

            function itemSelectedHandler(array){
                return function($event, item){
                    $scope[array].push(item);
                }
            }

            function itemDeselectedHandler(array){
                return function($event, item){
                    var i = $scope[array].indexOf(item);
                    if(i != -1){
                        $scope[array].splice(i, 1);
                    }
                }
            }

            function selectedItemsChangedHandler(array){
                return function($event, items){
                    $scope[array] = items;
                }
            }


            $scope.$on('escKeyDown', function handleEscKeyDown(){
                if($scope.selectedIngredients.length !== 0){
                    deselectAllIngredients();
                } else {
                    deselectAllRecipes()
                }
            });

        })();

        recipeSvc.get().then(function(recipes){
            $scope.recipes = recipes;
        });

        $scope.whenRenderRecipeDetailView = function(){
            return !$scope.whenRenderIngredientDetailView();
        }

        $scope.resolveRecipeDetailViewTitle = function(){
            return $scope.selectedRecipes.length === 1 ? $scope.selectedRecipes[0].name : 'Recipe panel';
        }

        $scope.whenRenderIngredientDetailView = function(){
            return $scope.selectedRecipes.length === 1 && ($scope.selectedIngredients.length === 1 || inputtingIngredient);
        }

        $scope.resolveIngredientDetailViewTitle = function(){
            return $scope.selectedIngredients.length === 1 ? $scope.selectedIngredients[0].name : 'Ingredient panel';
        }

        $scope.saveIngredient = function(item){
            getSelectedRecipe().addIngredient(item);
        };

        $scope.handleEnablingInput = function(){
            disableListViews();
        }

        $scope.handleDisablingInput = function(){
            enableListViews();
            inputtingIngredient = false;
        }

        $scope.handleRecipeListNewClicked = function(){
            deselectAllRecipes();
            enableRecipeInput();
        }

        $scope.handleRecipeListEditClicked = function(){
            if($scope.selectedRecipes.length === 1){
                enableRecipeInput();
            }
        }

        $scope.handleRecipeListDeleteClicked = function(){
            deleteSelectedRecipes();
        }

        $scope.handleIngredientListNewClicked = function(){
            if($scope.selectedRecipes.length === 1) {
                inputtingIngredient = true;
                enableIngredientInput();
            }
        }

        $scope.handleIngredientListEditClicked = function(){
            if($scope.selectedIngredients.length === 1){
                enableIngredientInput();
            }
        }

        $scope.handleIngredientListDeleteClicked = function(){
            deleteSelectedIngredients();
        }

        $scope.handleIngredientListSyncClicked = function(){
            syncIngredients();
        }

        $scope.handleRecipeListDelKeyUp = function(){
            deleteSelectedRecipes();
        }

        $scope.handleIngredientListDelKeyUp = function(){
            deleteSelectedIngredients();
        }

        $scope.handleRecipeListRowDblClick = function(){
            enableRecipeInput();
        }

        $scope.handleIngredientListRowDblClick = function(){
            enableIngredientInput();
        }

        function addToRecipes(recipe){
            $scope.recipes.push(recipe);
        }

        function removeFromRecipes(recipe){
            var i;
            if(recipe.isNew()){
                i = $scope.recipes.indexOf(recipe);
            } else {
                i = $scope.recipes.findIndex(function(e){ return e.id === recipe.id; });
            }
            $scope.recipes.splice(i, 1);
        }

        function selectRecipe(recipe){
            $scope.$broadcast('selectRecipe', recipe);
        }

        function deselectAllRecipes(){
            $scope.$broadcast('deselectAllRecipes')
        }

        function selectIngredient(ingredient){
            $scope.$broadcast('selectIngredient', ingredient);
        }

        function deselectAllIngredients(){
            $scope.$broadcast('deselectAllIngredients')
        }

        function enableRecipeInput(){
            $scope.$broadcast('enableRecipeInput');
        }

        function enableIngredientInput(){
            $scope.$broadcast('enableIngredientInput');
        }

        function getSelectedRecipe(){
            return $scope.selectedRecipes[0];
        }

        function enableListViews(){
            $scope.$broadcast('disablingInput');
        }

        function disableListViews(){
            $scope.$broadcast('enablingInput');
        }

        $scope.saveRecipe = function(recipe){
            if(recipe.isNew()){
                recipeSvc.put(recipe).then(function(recipe){
                    addToRecipes(recipe);
                    selectRecipe(recipe);
                });
            } else {
                recipeSvc.post(recipe).then(function(updated){
                    //TODO: Možda bi trebalo dodati preko metode modela...
                    updated.ingredients = recipe.ingredients;
                    removeFromRecipes(recipe);
                    addToRecipes(updated);
                    selectRecipe(updated);
                });
            }
        }

        function deleteSelectedRecipes(){

            var many = $scope.selectedRecipes.length;
            var message = many > 1 ?
                sprintf('Are you sure you wish to delete these %d recipes?', many) :
                sprintf('Are you sure you wish to delete %s?', $scope.selectedRecipes[0].name);

            if($window.confirm(message)){
                _delete();
            }

            function _delete(){

                Promise.all($scope.selectedRecipes.map(function(recipe){
                    return recipeSvc.delete(recipe).then(function(){
                        removeFromRecipes(recipe);
                    }).catch();
                }))
            }

        }

        function syncIngredients(){
            return Promise.all($scope.selectedIngredients.map(function(ingredient){
                if(ingredient.isNew()){
                    return ingredientService.put(ingredient).then(function(saved){
                        var recipe = $scope.recipes.find(function(recipe) { return recipe.id === saved.recipe_id });
                        if(recipe){
                            recipe.removeIngredient(ingredient);
                            recipe.addIngredient(saved);
                            selectIngredient(saved);
                        }
                    })
                } else if(ingredient.isDirty()){
                    return ingredientService.post(ingredient).then(function(updated){
                        var recipe = $scope.recipes.find(function(recipe) { return recipe.id === updated.recipe_id });
                        if(recipe){
                            recipe.removeIngredient(ingredient);
                            recipe.addIngredient(updated);
                            selectIngredient(updated);
                        }
                    })
                }
            }))
        }

        function deleteSelectedIngredients(){
            return Promise.all($scope.selectedIngredients.map(function(ingredient){
                if(ingredient.isNew()){
                    var recipe = $scope.recipes.find(function(recipe) { return recipe.id === ingredient.recipe_id; });
                    if(recipe){
                        recipe.removeIngredient(ingredient);
                    }
                } else {
                    ingredientService.delete(ingredient).then(function(){
                        var recipe = $scope.recipes.find(function(recipe) { return recipe.id === ingredient.recipe_id; });
                        if(recipe){
                            recipe.removeIngredient(ingredient);
                        }
                    })
                }
            }))
        }
    }

}