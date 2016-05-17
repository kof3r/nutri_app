/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('NutriApp', [
    require('./data-forge'),
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
            .state('nutrition', {
                url:'/nutrition',
                component: 'nutriApp',
                cache: false
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
    
    .component('nutriApp', require('./components/nutriApp'))
    .component('studentApp', require('./components/studentApp'))
    
    .factory('recipeService', require('./server-services/recipe-service'))
    .factory('ingredientService', require('./server-services/ingredient-service'));