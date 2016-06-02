/**
 * Created by gordan on 17.05.16..
 */

module.exports = ['$scope', '$http', 'formFields', 'tableColumn', 'interactor', 'zrValidator', 'recipeIngredientValidationScheme', function($scope, $http, form, Column, interactor, validate, recipeIngredientScheme) {
    
    const recipeUrl = '/nutriApp/recipe';
    const ingredientUrl = '/nutriApp/ingredient';
    const recipeIngredientUrl = `${recipeUrl}/ingredients`;

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

    $scope.getRecipeIngredients = function(heads) {
        const RecipeId = heads.recipeTable.map(r => r.id);

        return $http({
            method: 'GET',
            url: recipeIngredientUrl,
            params: {
                RecipeId: RecipeId
            }
        }).then(res => {
            if(res.status !== 200) {
                return Promise.reject();
            }
            return res.data.map(ri => {
                const k = ri.amount / ((['mass', 'volume'].indexOf(ri.measure) !== -1) ? 100.0 : 1);
                ri.carbs = ri.Ingredient.carbs * k;
                ri.fats = ri.Ingredient.fats * k;
                ri.protein = ri.Ingredient.protein * k;
                ri.name = ri.Ingredient.name;
                delete ri.Ingredient;
                return ri;
            });
        });
    };

    $scope.getIngredients = function() {
        return $http.get(ingredientUrl).then(res => {
            return res.data;
        });
    };

    $scope.ingredientForm = [
        [ { name: new form.String('Name') } ],
        [ { carbs: new form.Slider('Carbs', { min: 0, max: 100 })} ],
        [ { fats: new form.Slider('Fats', { min: 0, max: 100 }) }],
        [ { protein: new form.Slider('Protein', { min: 0, max: 100 }) } ]
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

    $scope.recipeIngredientForm = [
        [ { IngredientId: new form.Autocomplete('Ingredient', searchIngredients, 'id', 'name') } ],
        [ { amount: new form.Number('Amount') }, { measure: new form.Enum('Measure', ['mass', 'volume', 'quantity']) } ]
    ];

    $scope.recipeIngredientTable = {
        name: new Column('Ingredient'),
        amount: new Column('Amount', 'mass'),
        carbs: new Column('Carbs', 'mass'),
        fats: new Column('Fats', 'mass'),
        protein: new Column('Protein', 'mass')
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
        });
    };
    
    $scope.saveRecipeIngredient = function(recipeIngredient) {

        const errors = validate(recipeIngredient, recipeIngredientScheme);

        if(errors.length > 0) {
            interactor.alert({
                title: 'Recipe ingredient validation error.',
                text: errors.join(' ')
            });

            return Promise.reject(errors);
        }

        const method = $http.post;
        
        return method(recipeIngredientUrl, recipeIngredient).then(ingredient => {
            if(!ingredient) {
                return Promise.reject();
            }
            return ingredient;
        });
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

    function searchIngredients(query) {
        return $http({
            method: 'GET',
            url: `${ingredientUrl}/search`,
            params: {
                name: query
            }
        }).then(res => {
            console.log(res.data);
            return res.data;
        });
    }

}];