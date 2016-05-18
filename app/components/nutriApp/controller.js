/**
 * Created by gordan on 17.05.16..
 */

module.exports = ['$scope', '$http', 'formFields', 'tableColumn', function($scope, $http, form, Column) {
    
    const recipeUrl = '/nutriApp/recipe';
    const ingredientUrl = '/nutriApp/ingredient';

    $scope.deleteRecipe = function(recipe) {
        return $http({
            method: 'DELETE',
            url: recipeUrl,
            params: {
                id: recipe.id
            }
        }).then(n => {
            if(n !== 1) {
                return Promise.reject();
            }
            return recipe;
        });
    };

    $scope.getRecipes = function() {
        return $http.get(recipeUrl).then(res => {
            return res.data;
        });
    };

    $scope.getIngredients = function() {
        return $http.get(ingredientUrl).then(res => {
            return res.data;
        });
    };

    $scope.ingredientForm = [
        [ { name: new form.String('Name') } ],
        [ { carbs: new form.Number('Carbs')}, { fats: new form.Number('Fats') }, { protein: new form.Number('Protein') } ]
    ];

    $scope.ingredientTable = {
        name: new Column('Name'),
        carbs: new Column('Carbs', 'mass'),
        fats: new Column('Fats', 'mass'),
        protein: new Column('Protein', 'mass')
    };

    $scope.recipeForm = [
        [ { name: new form.String('Recipe') } ]
    ];

    $scope.recipeIngredientTable = {
        name: new Column('Ingredient'),
        amount: new Column('Amount'),
        measure: new Column('Measure'),
        carbs: new Column('Carbs'),
        fats: new Column('Fats'),
        protein: new Column('Protein')
    };

    $scope.recipeTable = {
        name: new Column('Name')
    };
    
    $scope.saveRecipe = function(recipe) {
        const method = recipe.id ? $http.post : $http.put;

        return method(recipeUrl, recipe).then(res => {
            if(res.status !== 200) {
                return Promise.reject();
            }
            return res.data;
        })
    };

    $scope.saveIngredient = function (ingredient) {
        const method = ingredient.id ? $http.post : $http.put;

        return method(ingredientUrl, ingredient).then(res => {
            if(res.status !== 200) {
                return Promise.reject();
            }
            return res.data;
        });
    };



}];