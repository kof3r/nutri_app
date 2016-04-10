/**
 * Created by gordan on 10.04.16..
 */

module.exports = ['$injector', '$scope', '$filter', 'wireEvents', function ($injector, $scope, $filter, wireEvents){

    var ctrl = this;

    this.$onInit = function(){

        var detailView = $injector.get(ctrl.detailView);
        var fields = $scope.fields = detailView.fields;
        var Model = $injector.get(ctrl.modelName);

        (function registerWatches(){

            $scope.$watch('$ctrl.item', handleItemChange);

            $scope.$watch('inputEnabled', function handleInputEnabledChanged(newValue){
                if(newValue){
                    ctrl.onEnablingInput();
                } else{
                    ctrl.onDisablingInput();
                }
            })

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

        $scope.submitItem = function(isValid){
            if(isValid){
                ctrl.submitItem({item: $scope.item});
                disableInput();
            }
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
            return !isReadOnly(p) && $scope.form && ($scope.form.$submitted || $scope.form[p].$touched);
        }

        $scope.displayValue = function(p){
            var item = $scope.item;
            if(!item) return null;

            var value = resolveValue();
            if(!value || value !== value) return null;

            var filter = resolveFilter();
            value = filter ? filter(value) : value;
            return value;

            function resolveValue(){
                if(fields[p].reflect) {
                    return (fields[p].reflect.call(item))();
                }
                if (item[p]) {
                    if (isFunction(item[p])) {
                        return item[p]();
                    }
                    return item[p];
                }
                return null;
            }

            function resolveFilter(){
                var filter = fields[p].filter;
                if(isFunction(filter)){
                    filter = filter.call(item);
                }
                return filter ? $filter(filter) : null;
            }
        }

        $scope.handleModelChange = function(){
            $scope.item.dirty = true;
        }

        $scope.firstColumnWidth = function(){
            return 5;
        }

        $scope.secondColumnWidth = function(){
            return 12 - $scope.firstColumnWidth();
        }

        $scope.resolveValidators = function(p){
            return fields[p].validators;
        }

        function enableInput(){
            if(!ctrl.item) {
                $scope.item = new Model();
            }
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
            return (item && isGetterFunction(item[p])) || fields[p].reflect || (typeof fields[p].type === 'undefined');
        }

        function isFunction(f){
            return angular.isFunction(f);
        }

        function isGetterFunction(f){
            return angular.isFunction(f) && f.length === 0;
        }

        function isEnum(p){
            return fields[p].type && fields[p].type.constructor === Array;
        }

        function copy(){
            $scope.item = angular.copy(ctrl.item);
            if($scope.form){
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
            }
        }
    };

}]