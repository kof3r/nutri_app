/**
 * Created by ggrab on 24.2.2016..
 */

function controller($scope, recipeSvc, SelectionManager, util){

    var ctrl = this;

    this.$onInit = function(){

        $scope.recipes = [];
        $scope.selectedRecipes = [];
        $scope.ingredients = [];
        $scope.selectedIngredients = [];

        var recipeManager = new SelectionManager($scope, 'recipes', 'selectedRecipes');
        var ingredientManager = new SelectionManager($scope, 'ingredients', 'selectedIngredients');

        util.wireEvents($scope, ctrl.deselectAllOn, recipeManager.deselectAll.bind(recipeManager));

        recipeSvc.get().then(function(recipes){
            angular.forEach(recipes, function(recipe){
                recipeManager.add(recipe);
            })
        });

        $scope.$watchCollection(function(){ return $scope.selectedRecipes; }, handleSelectedRecipesChange);

        $scope.whenRenderRecipeForm = function(){
            return !$scope.whenRenderIngredientForm();
        }

        $scope.whenRenderIngredientForm = function(){
            return $scope.selectedIngredients.length === 1;
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

            Promise.all($scope.selectedRecipes.map(function(recipe){
                return recipeSvc.delete(recipe.id).then(function(){
                    recipeManager.remove(recipe);
                }).catch();
            }))
        }

        $scope.saveRecipe = function(item){
            if(item.id){
                var old = $scope.selectedRecipes[0];
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
        }

        $scope.deselectIngredient = function(ingredient){
            ingredientManager.deselect(ingredient);
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

angular.module('recipeManager', ['server', 'util', 'data'])

    .component('recipeManager', {
        templateUrl: 'recipe-manager/recipe-manager.html',
        controller: ['$scope', 'serverRecipeService', 'selectionManager', 'util', controller],
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