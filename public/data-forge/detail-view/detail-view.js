/**
 * Created by ggrab on 29.2.2016..
 */

angular.module('dataForge')

    .component('detailView', {

        templateUrl:'data-forge/detail-view/detail-view.html',
        bindings:{
            title:'@',
            detailView:'@',
            modelName:'@',
            item:'<',
            submitItem:'&onSaveClick',
            onDisableInput:'&onCancelClick',
            cancelInputOn:'@',
            enableInputOn:'@'

        },
        controller:['$scope', 'dataForge_registry', '$filter', 'wireEvents', controller]

    });

function controller($scope, registry, $filter, wireEvents){

    var ctrl = this;

    this.$onInit = function(){

        var fields = $scope.fields = registry.detailViewDefinition(ctrl.detailView);
        var Model = registry.dataModel(ctrl.modelName);

        (function registerWatches(){

            $scope.$watch('$ctrl.item', handleItemChange);

        })();

        (function wireThemEvents(){

            wireEvents($scope, ctrl.cancelInputOn, cancelInput);

            wireEvents($scope, ctrl.enableInputOn, enableInput);

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
            ctrl.submitItem({item: $scope.item});
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
            if(!ctrl.item) return null;
            var value = resolveValue(item, p);
            if(value !== value) return null;
            var filter = fields[p].filter;
            value = filter ? $filter(filter)(value) : value;
            return value;

            function resolveValue(item, p){
                if(fields[p].reflect) {
                    return fields[p].reflect(item);
                }
                if (item[p] || item[p] === 0) {
                    if (item[p].constructor === Function) {
                        return item[p]();
                    }
                    return item[p];
                }
                if(!item[p] && (fields[p].type === 'number')){
                    return 0;
                }
                return null;
            }
        }

        $scope.handleModelChange = function(){
            $scope.item.dirty = true;
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
            ctrl.onDisableInput();
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