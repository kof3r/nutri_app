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
                    recipeSvc: (recipeService) => recipeService,
                    ingredientSvc: (ingredientService) => ingredientService,
                    recipeTable: (recipeTableView) => recipeTableView,
                    recipeForm: (recipeDetailView) => recipeDetailView,
                    ingredientTable: (ingredientTableView) => ingredientTableView,
                    ingredientForm: (ingredientDetailView) => ingredientDetailView
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