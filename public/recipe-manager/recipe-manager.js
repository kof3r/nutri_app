/**
 * Created by ggrab on 24.2.2016..
 */

angular.module('recipeManager', ['server', 'util', 'dataForge', 'nutrition'])

    .run(['dataForge', 'Recipe', 'Ingredient', function(dataForge, Recipe, Ingredient){

        dataForge.registerDataModel('recipe', Recipe);

        dataForge.registerDetailView('recipeDetailView', {

            name: dataForge.FormField().labelAs('Name').ofType('text'),
            totalCalories: dataForge.FormField().labelAs('Calories').displayAs('energy'),
            totalCarbs: dataForge.FormField().labelAs('Carbs').displayAs('mass'),
            totalFats: dataForge.FormField().labelAs('Fats').displayAs('mass'),
            totalProtein: dataForge.FormField().labelAs('Protein').displayAs('mass')

        });

        dataForge.registerTableView('recipeTableView', {

            name: dataForge.TableColumn().withHeader('Name'),
            created_at: dataForge.TableColumn().withHeader('Date created').displayAs('date')

        });

        dataForge.registerDataModel('ingredient', Ingredient);

        dataForge.registerDetailView('ingredientDetailView', {

            name: dataForge.FormField().labelAs('Name').ofType('text'),
            amount: dataForge.FormField().labelAs('Amount').ofType('number').withStep(0.1).displayAs('mass'),
            caloriesNominal: dataForge.FormField().labelAs('Nominal').displayAs('energy'),
            carbs: dataForge.FormField().labelAs('Carbs').ofType('number').withStep(0.1).displayAs('mass'),
            fats: dataForge.FormField().labelAs('Fats').ofType('number').withStep(0.1).displayAs('mass'),
            protein: dataForge.FormField().labelAs('Protein').ofType('number').withStep(0.1).displayAs('mass')

        });

        dataForge.registerTableView('ingredientTableView', {

            name: dataForge.TableColumn().withHeader('Name'),
            amount: dataForge.TableColumn().withHeader('Amount').displayAs('mass'),
            totalCalories: dataForge.TableColumn().withHeader('Total calories').displayAs('energy'),
            totalCarbs: dataForge.TableColumn().withHeader('Carbs').displayAs('mass'),
            totalFats: dataForge.TableColumn().withHeader('Fats').displayAs('mass'),
            totalProtein: dataForge.TableColumn().withHeader('Protein').displayAs('mass')

        });

    }])

    .component('recipeManager', {
        templateUrl: 'recipe-manager/recipe-manager.html',
        controller: ['$scope', 'serverRecipeService', 'serverIngredientService', 'util', '$window', controller],
        bindings:{
            deselectAllOn:'<'
        }
    })

function controller($scope, recipeSvc, ingredientService, util, $window){

    var ctrl = this;

    this.$onInit = function(){

        $scope.recipes = [];
        $scope.selectedRecipes = [];
        $scope.ingredients = [];
        $scope.selectedIngredients = [];

        var inputtingIngredient = false;

        (function registerWatches(){

            $scope.$watchCollection('selectedRecipes', handleSelectedRecipesChange);

            function handleSelectedRecipesChange(){
                $scope.$broadcast('disruptInput');
                if($scope.selectedRecipes.length === 1){
                    $scope.ingredients = getSelectedRecipe().ingredients;
                } else {
                    $scope.ingredients = [];
                }
            }


            $scope.$watchCollection('selectedIngredients', handleSelectedIngredientsChange);

            function handleSelectedIngredientsChange(){
                $scope.$broadcast('disruptInput');
            }

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


            $scope.$on('recipeListRowDblClicked', handleRecipeListRowDblClicked);

            $scope.$on('ingredientListRowDblClicked', handleIngredientListRowDblClicked);

            function handleRecipeListRowDblClicked(){
                enableRecipeInput();
            }

            function handleIngredientListRowDblClicked(){
                enableIngredientInput();
            }

            $scope.$on('escKeyDown', handleEscKeyDown);

            function handleEscKeyDown(){
                if($scope.selectedIngredients.length !== 0){
                    deselectAllIngredients();
                } else {
                    deselectAllRecipes()
                }
            }

            $scope.$on('delKeyDown', handleDelKeyDown);

            function handleDelKeyDown(){
                if($scope.selectedIngredients.length > 0){

                } else if($scope.selectedRecipes.length > 0){
                    deleteSelectedRecipes();
                }
            }

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
                    //TODO: Možda bi trebalo dodati preko metode modela...
                    updated.ingredients = selectedRecipe.ingredients;
                    removeFromRecipes(selectedRecipe);
                    addToRecipes(updated);
                    selectRecipe(updated);
                });
            } else {
                recipeSvc.put(recipe).then(function(recipe){
                    addToRecipes(recipe);
                    selectRecipe(recipe);
                });
            }
        }

        $scope.saveIngredient = function(item){
            getSelectedRecipe().addIngredient(item);
        };

        $scope.handleIngredientInputCancelClick = function(){
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

        function addToRecipes(recipe){
            $scope.recipes.push(recipe);
        }

        function removeFromRecipes(recipe){
            var i = $scope.recipes.indexOf(recipe);
            if(i != -1){
                $scope.recipes.splice(i, 1);
            }
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
                        console.log(recipe);
                        if(recipe){
                            recipe.removeIngredient(ingredient);
                        }
                    })
                }
            }))
        }
    }

}