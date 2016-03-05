/**
 * Created by ggrab on 24.2.2016..
 */

function controller($scope, recipeSvc, SelectionManager, util, $window, $timeout){

    var ctrl = this;

    this.$onInit = function(){

        $scope.recipes = [];
        $scope.selectedRecipes = [];
        $scope.ingredients = [];
        $scope.selectedIngredients = [];

        var recipeManager = new SelectionManager($scope, 'recipes', 'selectedRecipes');
        var ingredientManager = new SelectionManager($scope, 'ingredients', 'selectedIngredients');

        (function wireEvents(){

            util.wireEvents($scope, 'recipeListRowClicked', handleRecipeListRowClicked);

            util.wireEvents($scope, 'recipeListRowCtrlClicked', handleRecipeListRowCtrlClicked);

            util.wireEvents($scope, 'ingredientListRowClicked', handleIngredientListRowClicked);

            util.wireEvents($scope, 'ingredientListRowCtrlClicked', handleIngredientListRowCtrlClicked);

            util.wireEvents($scope, 'recipeListRowDblClicked', handleRecipeListRowDblClicked);

            util.wireEvents($scope, 'ingredientListRowDblClicked', handleIngredientListRowDblClicked);

            util.wireEvents($scope, 'recipeSubmitted', handleRecipeSubmitted);

            util.wireEvents($scope, 'escKeyDown', handleEscKeyDown);

            util.wireEvents($scope, 'delKeyDown', handleDelKeyDown);

        })();

        (function registerWatches(){

            $scope.$watchCollection('selectedRecipes', handleSelectedRecipesChange);

        })();

        recipeSvc.get().then(function(recipes){
            $scope.recipes = recipes;
        });

        $scope.whenRenderRecipeForm = function(){
            return !$scope.whenRenderIngredientForm();
        }

        $scope.whenRenderIngredientForm = function(){
            return $scope.selectedRecipes.length === 1 && $scope.selectedIngredients.length === 1;
        }

        $scope.deleteSelectedRecipes = function(){
            deleteSelectedRecipes();
        }

        $scope.saveIngredient = function(item){
            if(item.id){
                var index = $scope.selectedRecipes[0].ingredients.indexOf($scope.selectedIngredients[0]);
                if(index != -1){
                    $scope.ingredients[index] = item;
                }
            } else {
                ingredientManager.add(item);
            }
        }

        $scope.enableRecipeInput = function(){
            $scope.recipeInputEnabled = true;
        }

        $scope.disableRecipeInput = function(){
            $scope.recipeInputEnabled = false;
        }

        $scope.enableIngredientInput = function(){
            $scope.ingredientInputEnabled = true;
        }

        $scope.disableIngredientInput = function(){
            $scope.ingredientInputEnabled = false;
        }

        $scope.handleRecipeDoubleClick = function(){
            $scope.enableRecipeInput();
        }

        $scope.handleIngredientDoubleClick = function(){
            $scope.enableIngredientInput();
        }



        function handleRecipeSubmitted(event, recipe){
            event.stopPropagation();
            saveRecipe(recipe);
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

        function saveRecipe(recipe){
            if(recipe.id){
                recipeSvc.post(recipe).then(function(updated){
                    recipeManager.remove(getSelectedRecipe());
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
                    return recipeSvc.delete(recipe.id).then(function(){
                        recipeManager.remove(recipe);
                    }).catch();
                }))
            }

        }

        function handleSelectedRecipesChange(){
            $scope.ingredients = [];
            $scope.selectedIngredients = [];
            if($scope.selectedRecipes.length === 1){
                addSelectedRecipeIngredients();
            }
        }

        function addSelectedRecipeIngredients(){
            $scope.ingredients = $scope.selectedRecipes[0].ingredients;
        }
    }

}

angular.module('recipeManager', ['server', 'util', 'data', 'mapper'])

    .component('recipeManager', {
        templateUrl: 'recipe-manager/recipe-manager.html',
        controller: ['$scope', 'serverRecipeService', 'selectionManager', 'util', '$window', '$timeout', controller],
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