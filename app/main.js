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
                    ingredientSvc: (ingredientService) => ingredientService
                }
            })
            .state('students', {
                url:'/students',
                component: 'studentApp',
                cache: false
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-purple');
    }])
    
    .component('recipesView', require('./components/recipes'))
    .component('ingredientsView', require('./components/ingredientsView'))
    .component('demoView', require('./components/demoView'))
    .component('studentApp', require('./components/studentApp'))
    
    .factory('recipeService', require('./server-services/recipe-service'))
    .factory('ingredientService', require('./server-services/ingredient-service'));