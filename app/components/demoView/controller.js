/**
 * Created by gordan on 13.05.16..
 */

module.exports = ['$scope', '$timeout', function($scope, $timeout) {

    const self = this;

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
