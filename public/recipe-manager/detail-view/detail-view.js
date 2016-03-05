/**
 * Created by ggrab on 29.2.2016..
 */

function controller($scope, $document, formFields, util, models){

    var ctrl = this;

    this.$onInit = function(){

        var fields = $scope.fields = formFields[ctrl.fields];
        var Model = models[ctrl.fields];

        (function registerWatches(){

            $scope.$watch('$ctrl.item', handleItemChange);

        })();

        (function wireEvents(){

            util.wireEvents($scope, ctrl.cancelInputOn, cancelInput);

            util.wireEvents($scope, ctrl.enableInputOn, enableInput);

        })();

        $scope.isInputEnabled = function(){
            return isInputEnabled();
        }

        $scope.handleNewClick = function(){
            enableInput();
        }

        $scope.handleEditClick = function(){
            enableInput();
        }

        $scope.handleCancelClick = function () {
            cancelInput();
        }

        $scope.handleSaveClick = function(){
            $scope.$emit(ctrl.saveClickEvent, angular.copy($scope.item));
            disableInput();
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
            if(!ctrl.item || !item[p]) return null;
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

        function enableInput(){
            $scope.inputEnabled = true;
        }

        function disableInput(){
            $scope.inputEnabled = false;
        }

        function isInputEnabled(){
            return $scope.inputEnabled;
        }

        function handleItemChange(){
            copy();
        }

        function cancelInput(){
            copy();
            disableInput();
        }

        function isReadOnly(p){
            var item = ctrl.item;
            return (item && item[p] && item[p].constructor === Function) || fields[p].reflect || (typeof fields[p].type === 'undefined');
        }

        function isEnum(p){
            return fields[p].type && fields[p].type.constructor === Array;
        }

        function copy(){
            if(ctrl.item){
                $scope.item = angular.copy(ctrl.item);
            } else {
                $scope.item = new Model();
            }
        }
    };

}

angular.module('recipeManager')

    .component('detailView', {

        templateUrl:'recipe-manager/detail-view/detail-view.html',
        bindings:{

            fields:'@',
            item:'<',
            saveClickEvent:'@onSaveClickEmit',
            cancelInputOn:'@',
            enableInputOn:'@'

        },
        controller:['$scope', '$document', 'formFields', 'util', 'models', controller]

    });