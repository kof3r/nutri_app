/**
 * Created by ggrab on 29.2.2016..
 */

function controller($scope, formFields, util){

    var ctrl = this;

    this.$onInit = function(){

        var fields = $scope.fields = formFields[ctrl.fields];

        util.wireEvents($scope, ctrl.cancelInputOn, cancelInput)

        $scope.$watch(function() { return ctrl.item; }, copy);

        $scope.isInputEnabled = function(){
            return isInputEnabled();
        }

        $scope.handleNewClick = function(){
            ctrl.onNewClick();
        }

        $scope.handleEditClick = function(){
            ctrl.onEditClick();
        }

        $scope.handleCancelClick = function () {
            cancelInput();
        }

        $scope.handleSaveClick = function(){
            ctrl.onSaveClick({ item: $scope.item });
        }

        $scope.whenShowLabel = function(p){
            return !isInputEnabled() || isReadOnly(p);
        }

        $scope.whenShowInput = function(p){
            return isInputEnabled();
        }

        $scope.doesInputRender = function(p){
            return !isReadOnly(p) && !isEnum(p);
        }

        $scope.whenShowSelect = function(p){
            return isInputEnabled();
        }

        $scope.doesSelectRender = function(p){
            return !isReadOnly(p) && isEnum(p);
        }

        $scope.whenShowErrors = function(p){
            return !isReadOnly(p) && form && (form.$submitted || (form[p] && form[p].$touched));
        }

        $scope.displayValue = function(p){
            var item = $scope.item;
            if(!ctrl.item) return null;
            var value = item[p].constructor === Function ? item[p]() : item[p];
            var filter = fields[p].filter;
            value = filter ? filter(value) : value;
            return value;
        }

        $scope.firstColumnWidth = function(){
            return 4;
        }

        $scope.secondColumnWidth = function(){
            return 12 - $scope.firstColumnWidth();
        }

        function cancelInput(){
            copy();
            ctrl.onCancelInput();
        }

        function isReadOnly(p){
            var item = ctrl.item;
            return (item && item[p] && item[p].constructor === Function) || fields[p].reflect || (typeof fields[p].type === 'undefined');
        }

        function isEnum(p){
            return fields[p].type && fields[p].type.constructor === Array;
        }

        function copy(){
            $scope.item = angular.copy(ctrl.item ? ctrl.item : {});
        }

        function isInputEnabled(){
            return ctrl.inputEnabled;
        }
    };

}

angular.module('recipeManager')

    .component('detailView', {

        templateUrl:'recipe-manager/detail-view/detail-view.html',
        bindings:{

            fields:'@',
            inputEnabled:'<',
            item:'<',
            onNewClick:'&',
            onEditClick:'&',
            onSaveClick:'&',
            onCancelInput:'&onCancelClick',
            cancelInputOn:'<'

        },
        controller:['$scope', 'formFields', 'util', controller]

    });