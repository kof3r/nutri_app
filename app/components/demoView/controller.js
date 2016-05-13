/**
 * Created by gordan on 13.05.16..
 */

module.exports = ['$scope', '$timeout', 'formFields', 'tableColumn', function($scope, $timeout, formField, TableColumn) {

    const self = this;

    $scope.recipeForm = {
        name: new formField.TextInput('Name')
    };

    $scope.recipeTable = {
        id: new TableColumn('id'),
        name: new TableColumn('Name'),
        totalCalories: new TableColumn('Calories', 'energy', 'right')
    };
    
    $scope.ingredientForm = {
        name: new formField.TextInput('Name'),
        amount: new formField.NumberInput('Amount', 0.1),
        measure: new formField.Enum('Measure', () => ($timeout(() => ['mass', 'volume', 'quantity'], 2000))),
        carbs: new formField.Slider('Carbohydrates', { min: 0, max: 100 }),
        fats: new formField.Slider('Fats', { min: 0, max: 100 }),
        protein: new formField.Slider('Protein', { min: 0, max: 100 })
    };
    
    $scope.ingredientTable = {
        id: new TableColumn('id'),
        name: new TableColumn('Name'),
        amount: new TableColumn('Amount', function() { return this.measure; }),
        totalCalories: new TableColumn('Total calories', 'energy'),
        totalCarbs: new TableColumn('Total carbs', 'mass'),
        totalFats: new TableColumn('Total fats', 'mass'),
        totalProtein: new TableColumn('Total protein', 'mass')
    };

    $scope.saveRecipe = function(recipe) {
        if(recipe.id) {
            return self.recipeSvc.post(recipe);
        } else {
            return self.recipeSvc.put(recipe);
        }
    };

    $scope.saveIngredient = function(ingredient) {
        if(ingredient.id) {
            return self.ingredientSvc.post(ingredient);
        } else {
            return self.ingredientSvc.put(ingredient);
        }
    };

    $scope.getRecipes = function(query) {
        query = sequelizeQuery(query);
        return self.recipeSvc.get(query);
    };

    $scope.getIngredients = function(query) {
        query = sequelizeQuery(query);
        return self.ingredientSvc.get(query);
    };

    $scope.deleteRecipe = function(recipe) {
        return delay(self.recipeSvc.delete(recipe.id));
    };

    $scope.deleteIngredient = function(ingredient) {
        return delay(self.ingredientSvc.delete(ingredient.id));
    };

    function delay(promise) {
        return $timeout(() => promise, Math.random() * 5000);
    }

    function sequelizeQuery(query) {
        const sequelQuery = {};
        for(let foreignKey in query) {
            sequelQuery[foreignKey] = { $in: query[foreignKey] };
        }
        return sequelQuery;
    }

}];
