/**
 * Created by gordan on 10.05.16..
 */

module.exports = ['$scope', '$timeout', function($scope, $timeout) {

    const self = this;

    $scope.recipes = self.recipes;
    $scope.selectedRecipes = [];
    $scope.selectedRecipe = null;
    $scope.ingredients = [];
    $scope.selectedIngredients = [];
    $scope.selectedIngredient = null;

    $scope.$watchCollection('selectedRecipes', () => {
        if($scope.selectedRecipes.length === 1) {
            $scope.selectedRecipe = $scope.selectedRecipes[0];
            $scope.selectedIngredient = { recipe_id: $scope.selectedRecipe.id };
        } else {
            $scope.selectedRecipe = null;
        }
    });

    $scope.$watch('selectedRecipe', () => {
        $scope.ingredients.splice(0);
        if($scope.selectedRecipe) {
            angular.copy($scope.selectedRecipe.ingredients, $scope.ingredients);
        }
    });

    $scope.$watchCollection('selectedIngredients', () => {
        if($scope.selectedIngredients.length === 1) {
            $scope.selectedIngredient = $scope.selectedIngredients[0];
        } else {
            $scope.selectedIngredient = null;
        }
    });

    $scope.selectedRecipesChanged = function (selected) {
        $scope.selectedRecipes.splice(0);
        angular.copy(selected, $scope.selectedRecipes);
    };

    $scope.selectedIngredientsChanged = function(selected) {
        $scope.selectedIngredients.splice(0);
        angular.copy(selected, $scope.selectedIngredients);
    };
    
    $scope.saveRecipe = function(recipe) {
        let pendingSave;
        let ingredients = recipe.ingredients;
        delete recipe.ingredients;
        if(recipe.id) {
            pendingSave = self.recipeSvc.post(recipe).then(saved => {
                saved.ingredients = ingredients;
                const i = $scope.recipes.findIndex(r => r.id === saved.id);
                if(i !== -1) {
                    $scope.recipes.splice(i, 1);
                }
                $scope.recipes.push(saved);
            })
        } else {
            pendingSave = self.recipeSvc.put(recipe).then(saved => {
                $scope.recipes.push(saved);
            });
        }
    };

    $scope.saveIngredient = function(ingredient) {
        let selectedRecipe = $scope.selectedRecipe;
        let pendingSave;
        if(selectedRecipe){
            if(ingredient.id) {
                self.ingredientSvc.post(ingredient).then(saved => {
                    selectedRecipe.addIngredient(saved);
                    $timeout(() => { $scope.selecetedRecipe = selectedRecipe; })
                });
            } else {
                self.ingredientSvc.put(ingredient).then(saved => {
                    selectedRecipe.addIngredient(saved);
                    $timeout(() => { $scope.selecetedRecipe = selectedRecipe; })
                });
            }
        }
    };

}];