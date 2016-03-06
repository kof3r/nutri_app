/**
 * Created by ggrab on 24.2.2016..
 */

function controller($scope, recipeSvc, ingredientService, SelectionManager, util, $window){

    var ctrl = this;

    this.$onInit = function(){

        $scope.recipes = [];
        $scope.selectedRecipes = [];
        $scope.ingredients = [];
        $scope.selectedIngredients = [];

        var recipeManager = new SelectionManager($scope, 'recipes', 'selectedRecipes');
        var ingredientManager = new SelectionManager($scope, 'ingredients', 'selectedIngredients');
        var inputtingIngredient = false;

        (function wireEvents(){

            util.wireEvents($scope, 'recipeListRowClicked', handleRecipeListRowClicked);

            util.wireEvents($scope, 'recipeListRowCtrlClicked', handleRecipeListRowCtrlClicked);

            util.wireEvents($scope, 'recipeListRowDblClicked', handleRecipeListRowDblClicked);

            util.wireEvents($scope, 'ingredientListRowClicked', handleIngredientListRowClicked);

            util.wireEvents($scope, 'ingredientListRowCtrlClicked', handleIngredientListRowCtrlClicked);

            util.wireEvents($scope, 'ingredientListRowDblClicked', handleIngredientListRowDblClicked);

            util.wireEvents($scope, 'escKeyDown', handleEscKeyDown);

            util.wireEvents($scope, 'delKeyDown', handleDelKeyDown);

        })();

        (function registerWatches(){

            $scope.$watchCollection('selectedRecipes', handleSelectedRecipesChange);

            $scope.$watchCollection('selectedIngredients', handleSelectedIngredientsChange)

        })();

        recipeSvc.get().then(function(recipes){
            $scope.recipes = recipes;
        });

        $scope.whenRenderRecipeDetailView = function(){
            return !$scope.whenRenderIngredientDetailView();
        }

        $scope.whenRenderIngredientDetailView = function(){
            return $scope.selectedRecipes.length === 1 && ($scope.selectedIngredients.length === 1 || inputtingIngredient);
        }

        $scope.saveRecipe = function(recipe){
            if(recipe.id){
                var selectedRecipe = getSelectedRecipe();
                recipeSvc.post(recipe).then(function(updated){
                    updated.ingredients = selectedRecipe.ingredients;
                    recipeManager.remove(selectedRecipe);
                    recipeManager.add(updated);
                    recipeManager.select(updated);
                });
            } else {
                recipeSvc.put(recipe).then(function(recipe){
                    recipeManager.add(recipe);
                    recipeManager.select(recipe);
                });
            }
        }

        $scope.saveIngredient = function(item){
            $scope.selectedRecipes[0].addIngredient(item);
        };

        $scope.handleIngredientInputCancelClick = function(){
            inputtingIngredient = false;
        }

        $scope.handleRecipeListNewClicked = function(){
            recipeManager.deselectAll();
            $scope.$broadcast('enableRecipeInput');
        }

        $scope.handleRecipeListEditClicked = function(){
            if($scope.selectedRecipes.length === 1){
                $scope.$broadcast('enableRecipeInput');
            }
        }

        $scope.handleRecipeListDeleteClicked = function(){
            deleteSelectedRecipes();
        }

        $scope.handleIngredientListNewClicked = function(){
            if($scope.selectedRecipes.length === 1) {
                inputtingIngredient = true;
                ingredientManager.deselectAll();
                $scope.$broadcast('enableIngredientInput');
            }
        }

        $scope.handleIngredientListEditClicked = function(){
            if($scope.selectedIngredients.length === 1){
                $scope.$broadcast('enableIngredientInput');
            }
        }

        $scope.handleIngredientListDeleteClicked = function(){

        }

        $scope.handleIngredientListSyncClicked = function(){
            syncIngredients();
        }


        function handleIngredientListRowClicked(event, recipe){
            handleListRowClicked(event, recipe, ingredientManager);
        }

        function handleIngredientListRowCtrlClicked(event, recipe){
            handleListRowCtrlClicked(event, recipe, ingredientManager);
        }

        function handleRecipeListRowClicked(event, recipe){
            handleListRowClicked(event, recipe, recipeManager);
        }

        function handleRecipeListRowCtrlClicked(event, recipe){
            handleListRowCtrlClicked(event, recipe, recipeManager);
        }

        function handleListRowCtrlClicked(event, item, manager){
            event.stopPropagation();
            if(manager.isSelected(item)){
                manager.deselect(item);
            } else {
                manager.select(item);
            }
        }

        function handleListRowClicked(event, item, manager){
            event.stopPropagation();
            var isSelected = manager.isSelected(item);
            manager.deselectAll();
            if(isSelected){
                manager.deselect(item);
            } else {
                manager.select(item);
            }
        }

        function handleEscKeyDown(){
            $scope.$broadcast('disruptInput');
            if($scope.selectedIngredients.length != 0){
                ingredientManager.deselectAll();
            } else {
                recipeManager.deselectAll();
            }
        }

        function handleDelKeyDown(){
            if($scope.selectedIngredients.length > 0){

            } else if($scope.selectedRecipes.length > 0){
                deleteSelectedRecipes();
            }
        }

        function handleRecipeListRowDblClicked($event, recipe){
            recipeManager.deselectAll();
            recipeManager.select(recipe);
            $scope.$broadcast('enableRecipeInput');
        }

        function handleIngredientListRowDblClicked($event, ingredient){
            ingredientManager.deselectAll();
            ingredientManager.select(ingredient);
            $scope.$broadcast('enableIngredientInput');
        }

        function getSelectedRecipe(){
            return $scope.selectedRecipes[0];
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
                        recipeManager.remove(recipe);
                    }).catch();
                }))
            }

        }

        function syncIngredients(){
            return Promise.all($scope.selectedIngredients.map(function(ingredient){
                if(ingredient.isNew()){
                    return ingredientService.put(ingredient).then(function(saved){
                        var recipe = $scope.recipes.find(function(recipe) { return recipe.id === saved.recipe_id});
                        if(recipe){
                            recipe.removeIngredient(ingredient);
                            recipe.addIngredient(saved);
                        }
                    })
                }
            }))
        }

        function handleSelectedRecipesChange(){
            $scope.$broadcast('disruptInput');
            $scope.ingredients = [];
            $scope.selectedIngredients = [];
            if($scope.selectedRecipes.length === 1){
                $scope.ingredients = getSelectedRecipe().ingredients;
            }
        }

        function handleSelectedIngredientsChange(){
            $scope.$broadcast('disruptInput');
        }
    }

}

angular.module('recipeManager', ['server', 'util', 'data', 'packer'])

    .component('recipeManager', {
        templateUrl: 'recipe-manager/recipe-manager.html',
        controller: ['$scope', 'serverRecipeService', 'serverIngredientService', 'selectionManager', 'util', '$window', '$timeout', controller],
        bindings:{
            deselectAllOn:'<'
        }
    })

    .factory('formFields', ['recipeFormFields', 'ingredientFormFields', function(recipe, ingredient){
        return{
            recipe: recipe,
            ingredient: ingredient
        }
    }])

    .factory('tableColumns', ['recipeListColumns', 'ingredientListColumns', function(recipes, ingredients){
        return{
            recipes: recipes,
            ingredients: ingredients
        }
    }])

    .factory('models', ['Recipe', 'Ingredient', function(Recipe, Ingredient){

        return {
            recipe: Recipe,
            ingredient: Ingredient
        }

    }])