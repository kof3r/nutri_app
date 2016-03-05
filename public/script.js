/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('NutriApp', ['recipeManager', 'util'])
    .controller('Controller', ['$rootScope', '$scope', function($rootScope, $scope){

        this.$onInit = function(){

            $scope.$on('selectedRecipesChanged', function () {
                console.log('Caught higher up!')
            })

            $scope.handleKeyDown = function($event){
                switch($event.which){
                    case 27:{
                        $rootScope.$broadcast('escKeyDown');
                        break;
                    }
                    case 46:{
                        $rootScope.$broadcast('delKeyDown');
                    }
                }
            }

        }

    }]);