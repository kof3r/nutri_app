/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('NutriApp', ['recipeManager', 'util'])
    .controller('Controller', ['$rootScope', '$scope', function($rootScope, $scope){

        this.$onInit = function(){

            $scope.handleKeyDown = function($event){
                if($event.which === 27){
                    $rootScope.$broadcast('escKey');
                }
            }

        }

    }]);