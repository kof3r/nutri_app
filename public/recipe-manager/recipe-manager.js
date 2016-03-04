/**
 * Created by ggrab on 24.2.2016..
 */

function controller($scope, recipeSvc, SelectionManager, util, mapper, $window){

    var ctrl = this;

    this.$onInit = function(){

        $scope.recipes = [];
        $scope.selectedRecipes = [];
        $scope.ingredients = [];
        $scope.selectedIngredients = [];

        var recipeManager = new SelectionManager($scope, 'recipes', 'selectedRecipes');
        var ingredientManager = new SelectionManager($scope, 'ingredients', 'selectedIngredients');

        util.wireEvents($scope, 'escKeyDown', handleEscKeyDown);

        util.wireEvents($scope, 'delKeyDown', handleDelKeyDown);

        recipeSvc.get().then(function(recipes){
            angular.forEach(recipes, function(recipe){
                recipeManager.add(recipe);
            })
        });

        $scope.$watchCollection('selectedRecipes', handleSelectedRecipesChange);

        $scope.whenRenderRecipeForm = function(){
            return !$scope.whenRenderIngredientForm();
        }

        $scope.whenRenderIngredientForm = function(){
            return $scope.selectedRecipes.length === 1 && ($scope.selectedIngredients.length === 1 || $scope.ingredientInputEnabled);
        }

        $scope.selectRecipe = function(recipe){
            recipeManager.select(recipe);
            $scope.$broadcast('disruptInput');
        }

        $scope.deselectRecipe = function(recipe){
            recipeManager.deselect(recipe);
            $scope.$broadcast('disruptInput');
        }

        $scope.deselectAllRecipes = function(){
            recipeManager.deselectAll();
            $scope.$broadcast('disruptInput');
        }

        $scope.selectAllRecipes = function(){
            recipeManager.selectAll();
        }

        $scope.deleteSelectedRecipes = function(){
            deleteSelectedRecipes();
        }

        $scope.saveRecipe = function(item){
            if(item.id){
                var old = $scope.selectedRecipes[0];
                console.log(item.recipes);
                recipeSvc.post(item).then(function(recipe){
                    console.log(recipe);
                    recipeManager.remove(old);
                    recipeManager.add(recipe);
                    recipeManager.select(recipe);
                }).catch(function(){

                })
            } else {
                recipeSvc.put(item).then(function(recipe){
                    recipeManager.add(recipe);
                    recipeManager.select(recipe);
                });
            }
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

        $scope.selectIngredient = function(ingredient){
            ingredientManager.select(ingredient);
            $scope.$broadcast('disruptInput');
        }

        $scope.deselectIngredient = function(ingredient){
            ingredientManager.deselect(ingredient);
            $scope.$broadcast('disruptInput');
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

        function handleEscKeyDown(){
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
        controller: ['$scope', 'serverRecipeService', 'selectionManager', 'util', 'mapper', '$window', controller],
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