/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('NutriApp', [
    require('./recipe-manager'),
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
                templateUrl:'templates/recipes.html',
                controller: 'recipeViewController'
            })
            .state('inputRecipe', {
                url: '/newRecipe/:redirect?id',
                templateUrl: 'templates/df-input-form.html',
                controller: 'dfInputFormController',
                resolve: {
                    _service: 'recipeService',
                    _definition: 'recipeDetailView',
                    _redirect: () => 'recipes'
                }
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-purple');
    }])

    .controller('Controller', ['$scope', function($scope){
        
        

    }])
    
    .controller('recipeViewController', require('./views/recipes/recipeViewController'))
    .controller('loadingController', require('./views/loading/loading'))
    .controller('dfInputFormController', require('./df-input-form/controller'))
    .factory('recipeService', require('./server-services/recipe-service'));