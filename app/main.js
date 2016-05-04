/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('NutriApp', [
    require('dfInputForm'),
    require('./recipe-manager'),
    require('angular-route'),
    'ngMaterial',
    'md.data.table'
])

    .config(['$routeProvider', '$mdThemingProvider', function($route, $mdThemingProvider){

        $route.when('/', {
            templateUrl:'templates/recipes.html',
            controller: 'recipeViewController',
            resolve:{
                service: 'serverRecipeService'
            }
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-purple');
    }])

    .controller('Controller', ['$rootScope', '$scope', '$mdSidenav', function($rootScope, $scope, $mdSidenav){

        this.$onInit = () => {

            $scope.openMenu = () => {
                $mdSidenav('menu').toggle();
            };

            $scope.handleKeyDown = function($event){
                switch($event.which){
                    case 27:{
                        $rootScope.$broadcast('escKeyDown');
                        break;
                    }
                }
            }

        };
    }])
    
    .controller('recipeViewController', require('./views/recipes/recipeViewController'));