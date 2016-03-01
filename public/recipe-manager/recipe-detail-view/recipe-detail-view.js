/**
 * Created by ggrab on 25.2.2016..
 */

function controller($scope){
    var ctrl = this;

    this.$onInit = function(){

        var inputEnabled = false;

        $scope.$on(ctrl.exitInputModeOn, disableInput);

        $scope.$watch(function() {return ctrl.recipe;}, copy);

        $scope.handleNewClick = function(){
            enableInput();
        };

        $scope.handleSaveClick = function(){
            disableInput();
            ctrl.onSaveClick({recipe: $scope.recipe});
        };

        $scope.handleCancelClick = function () {
            disableInput();
            copy();
        }

        $scope.inputEnabled = function(){
            return inputEnabled;
        }

        function copy(){
            $scope.recipe = angular.copy(ctrl.recipe);
        }

        function enableInput(){
            inputEnabled = true;
        }

        function disableInput(){
            inputEnabled = false;
        }

    }

}

angular.module('recipeManager')
    .component('recipeDetailView', {

        templateUrl:'recipe-manager/recipe-detail-view/recipe-detail-view.html',
        bindings:{
            recipe:'<',
            onSaveClick:'&',
            exitInputModeOn:'@'
        },
        controller: ['$scope', controller]

    });
