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
            onEnablingInput:'&',
            onDisablingInput:'&',
            submitItem:'&onSaveClick',
            cancelInputOn:'@',
            enableInputOn:'@'

        },
        controller:['$injector', '$scope', 'dataForge_registry', '$filter', 'wireEvents', controller]

    });

function controller($injector, $scope, registry, $filter, wireEvents){

    var ctrl = this;

    this.$onInit = function(){

        var fields = $scope.fields = registry.detailViewDefinition(ctrl.detailView);
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

}

angular.module('dataForge')
    .directive('validate', ['dataForge_registry', function(registry){



        return {
            restrict: 'A',
            require:'ngModel',
            link: function(scope, elem, attrs, ctrl){

                attrs.$observe('validate', function(){
                    var validators = scope.resolveValidators(attrs.validate);

                    validators.forEach(function(validatorObj){
                        var validatorInvocation = validatorObj.validator.split(':');
                        var validator = registry.validator(validatorInvocation[0]);
                        if(validator.length === 0){
                            validator = validator.apply(ctrl, validatorInvocation);
                        }

                        ctrl.$validators[validatorObj.validator] = validator.bind(ctrl);
                    })
                })

            }
        }

    }])