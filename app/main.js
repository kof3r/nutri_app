/**
 * Created by ggrab on 23.2.2016..
 */

const app = require('angular').module('NutriApp', [
    require('./recipe-manager'),
    require('angular-route')
])

    .config(['$routeProvider', function($route){

        $route.when('/', {
            template:'<recipe-manager></recipe-manager>'
        })

    }])

    .controller('Controller', ['$rootScope', '$scope', function($rootScope, $scope){

        this.$onInit = function(){

            $scope.handleKeyDown = function($event){
                switch($event.which){
                    case 27:{
                        $rootScope.$broadcast('escKeyDown');
                        break;
                    }
                }
            }

        }

    }]);

