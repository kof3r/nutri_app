/**
 * Created by ggrab on 29.2.2016..
 */

function controller($scope, formFields, util){

    var ctrl = this;

    this.$onInit = function(){

        var fields = $scope.fields = formFields[ctrl.fields];
        disableInput();

        util.wireEvents($scope, ctrl.cancelInputOn, cancelInput);

        $scope.$watch(function() { return ctrl.item; }, copy);

        $scope.handleNewClick = function(){
            $scope.$emit('addingNew');
            enableInput();
        }

        $scope.handleEditClick = function(){
            enableInput();
        }

        $scope.handleCancelClick = function () {
            cancelInput();
        }

        $scope.handleSaveClick = function(){
            disableInput();
            ctrl.onSaveClick({ item: $scope.item });
        }

        $scope.whenShowLabel = function(p){
            return !isInputMode() || isReadOnly(p);
        }

        $scope.whenShowInput = function(p){
            return isInputMode();
        }

        $scope.doesInputRender = function(p){
            return !isReadOnly(p) && !isEnum(p);
        }

        $scope.whenShowSelect = function(p){
            return isInputMode();
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
            var value = fields[p].reflect ? fields[p].reflect(item) : item[p].constructor === Function ? item[p]() : item[p];
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

        function isInputMode(){
            return $scope.inputMode;
        }

        function enableInput(){
            $scope.inputMode = true;
        }

        function disableInput(){
            $scope.inputMode = false;
        }

        function cancelInput(){
            disableInput();
            copy();
        }
    };

}

angular.module('recipeManager')

    .component('detailView', {

        templateUrl:'recipe-manager/detail-view/detail-view.html',
        bindings:{

            fields:'@',
            item:'<',
            onSaveClick:'&',
            cancelInputOn:'<'

        },
        controller:['$scope', 'formFields', 'util', controller]

    });