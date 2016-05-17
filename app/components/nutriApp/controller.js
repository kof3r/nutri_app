/**
 * Created by gordan on 17.05.16..
 */

module.exports = ['$scope', '$http', 'formFields', 'tableColumn', function($scope, $http, form, Column) {
    
    const recipeUrl = '/nutriApp/recipe';

    $scope.deleteRecipe = function(recipe) {
        return $http({
            method: 'DELETE',
            url: recipeUrl,
            params: {
                id: recipe.id
            }
        })
    };

    $scope.recipeForm = [
        [ { name: new form.String('Recipe') } ]
    ];

    $scope.recipeIngredientTable = function(heads) {
        
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

    $scope.getRecipes = function() {
        return $http.get(recipeUrl).then(res => {
            console.log(res.data);
            return res.data;
        });
    };

}];