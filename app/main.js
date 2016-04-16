/**
 * Created by ggrab on 23.2.2016..
 */

const app = require('angular').module('NutriApp', [
    require('./recipe-manager'),
    require('angular-route'),
    'ngMaterial'
])

    .config(['$routeProvider', function($route){

        $route.when('/', {
            template:'<recipe-manager></recipe-manager>'
        })

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
    }]);
