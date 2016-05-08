/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('NutriApp', [
    require('./data-forge'),
    require('./components/df-input-form'),
    require('./components/df-table-view'),
    require('./nutrition'),
    'ui.router',
    'ngMaterial',
    'md.data.table'
])

    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider){

        $urlRouterProvider
            .otherwise('/recipes');

        $stateProvider
            .state('recipes', {
                url: '/recipes',
                component: 'recipesView',
                cache: false,
                resolve: {
                    tableView: (recipeTableView) => recipeTableView
                }
            })
            .state('inputRecipe', {
                url: '/inputRecipe/?id',
                component: 'dfInputForm',
                resolve: {
                    service: (recipeService) => recipeService,
                    definition: (recipeDetailView) => recipeDetailView,
                    item: ($stateParams, recipeService) => ($stateParams.id ? recipeService.get($stateParams.id) : {}),
                    redirect: () => 'recipes'
                },
                cache: false
            })
            .state('ingredients', {
                url:'/ingredients',
                component:'ingredientsView',
                cache: false,
                resolve: {
                    recipes: (recipeService) => recipeService.get(),
                    tableView: (ingredientTableView) => ingredientTableView
                }
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-purple');
    }])
    
    .component('recipesView', require('./components/recipes'))
    .component('ingredientsView', require('./components/ingredientsView'))
    .factory('recipeService', require('./server-services/recipe-service'))
    .factory('recipeDetailView', require('./meta/recipe-detail-view'))
    .factory('recipeTableView', require('./meta/recipe-table-view'))
    .factory('ingredientTableView', require('./meta/ingredient-table-view'));