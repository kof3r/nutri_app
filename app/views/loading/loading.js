/**
 * Created by gordan on 07.05.16..
 */

module.exports = ['$state', 'recipeStorage', '$timeout', 'recipeService', function($state, recipeStorage, $timeout, service) {

    const getRecipes = service.get().then((recipes) => {
        angular.copy(recipes, recipeStorage);
    });

    minWait(getRecipes).then(() => {
        $state.go('recipes');
    });

    function minWait(promise) {
        return Promise.all([promise, $timeout(1000)]);
    }

}];