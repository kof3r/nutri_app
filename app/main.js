/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('NutriApp', [
    require('./data-forge'),
    require('./components/df-input-form'),
    require('./components/df-table-view'),
    require('./nutrition'),
    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'md.data.table'
])

    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider){

        $urlRouterProvider
            .otherwise('/demo');

        $stateProvider
            .state('demo', {
                url:'/demo',
                component: 'demoView',
                cache: false,
                resolve: {
                    recipes: (recipeService) => recipeService.get(),
                    recipeTable: (recipeTableView) => recipeTableView,
                    recipeForm: (recipeDetailView) => recipeDetailView,
                    ingredientTable: (ingredientTableView) => ingredientTableView,
                    ingredientForm: (ingredientDetailView) => ingredientDetailView
                }
            })
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
                    service: (ingredientService) => ingredientService,
                    tableView: (ingredientTableView) => ingredientTableView
                }
            })
            .state('inputIngredient', {
                url: '/inputIngredient/:recipe_id?id',
                component: 'dfInputForm',
                cache: false,
                resolve: {
                    service: (ingredientService) => ingredientService,
                    definition: (ingredientDetailView) => ingredientDetailView,
                    item: ($stateParams, ingredientService) => ($stateParams.id ? ingredientService.get($stateParams.id) : {recipe_id: $stateParams.recipe_id}),
                    redirect: () => 'ingredients'
                }
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-purple');
    }])
    
    .component('recipesView', require('./components/recipes'))
    .component('ingredientsView', require('./components/ingredientsView'))
    .component('demoView', require('./components/demoView'))
    
    .factory('recipeService', require('./server-services/recipe-service'))
    .factory('ingredientService', require('./server-services/ingredient-service'))
    
    .factory('recipeDetailView', require('./meta/recipe-detail-view'))
    .factory('recipeTableView', require('./meta/recipe-table-view'))
    .factory('ingredientDetailView', require('./meta/ingredient-detail-view'))
    .factory('ingredientTableView', require('./meta/ingredient-table-view'));