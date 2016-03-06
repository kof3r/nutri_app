/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('recipeManager')

    .component('recipeListView', {
        templateUrl:'recipe-manager/recipe-list-view/recipe-list-view.html',
        bindings:{
            title:'@',
            data:'@',
            items:'<',
            selectedItems:'<',
            rowClickEvent:'@onRowClickEmit',
            rowDblClickEvent:'@onRowDblClickEmit',
            rowCtrlClickEvent:'@onRowCtrlClickEmit',
            newClick:'&onNewClick',
            editClick:'&onEditClick',
            deleteClick:'&onDeleteClick',
            syncClick:'&onSyncClick'
        },
        controller: ['$scope', 'orderByFilter', 'tableColumns', controller]
    });

function controller($scope, orderBy, tableColumns){
    var ctrl = this;

    this.$onInit = function(){
        var cache = new Cache(function(){ return orderBy(ctrl.items, $scope.orderCriteria); })
        var columns = $scope.columns = tableColumns[ctrl.data];

        (function registerWatches(){
            $scope.$watch('orderCriteria', handleOrderCriteriaChanged);

            $scope.$watchCollection('$ctrl.items', handleItemsCollectionChanged);

            $scope.$watch('$ctrl.items', handleItemsChanged);
        })();

        $scope.items = function(){
            return cache.value();
        }

        $scope.displayItem = function(item, p){
            if(!item[p]) return null;
            var value = resolveValue(item, p);
            value = columns[p].filter ? columns[p].filter(value) : value;
            return value;

            function resolveValue(item, p){
                if(columns[p].reflect){
                    return columns[p].reflect(item);
                } else if(item[p].constructor === Function){
                    return item[p]();
                }
                return item[p];
            }
        }

        $scope.handleRowClick = function(item, $event){
            if($event.ctrlKey){
                $scope.$emit(ctrl.rowCtrlClickEvent, item);
            } else {
                $scope.$emit(ctrl.rowClickEvent, item);
            }
        }

        $scope.handleRowDblClick = function(item){
            $scope.$emit(ctrl.rowDblClickEvent, item);
        }

        $scope.handleHeaderClick = function(p){
            $scope.orderCriteria = p;
        }

        $scope.whenRenderNewButton = function(){
            return ctrl.selectedItems.length === 0;
        }

        $scope.whenRenderEditButton = function(){
            return ctrl.selectedItems.length === 1;
        }

        $scope.whenRenderDeleteButton = function(){
            return ctrl.selectedItems.length > 0;
        }

        $scope.handleNewClick = function(){
            ctrl.newClick();
        }

        $scope.handleEditClick = function(){
            ctrl.editClick();
        }

        $scope.handleDeleteClick = function(){
            ctrl.deleteClick();
        }

        $scope.handleSyncClick = function(){
            ctrl.syncClick();
        }

        $scope.resolveRowClass = function(item){
            var cls = (ctrl.selectedItems.indexOf(item) !== -1) ? 'selected ' : '';
            cls += item.isNew() ? 'new' : item.isDirty() ? 'dirty' : '';
            return cls;
        }

        $scope.resolveCellStyle = function(p){
            return {
                align: columns[p].align ? columns[p].align : 'left'
            }
        }

        function handleItemsCollectionChanged() {
            cache.invalidate();
        }

        function handleItemsChanged(){
            cache.invalidate();
        }

        function handleOrderCriteriaChanged(){
            cache.invalidate();
        }

    }

}

function Cache(calculate){
    this.valid = false;
    this.calculate = calculate;
}

Cache.prototype.invalidate = function(){
    this.valid = false;
}

Cache.prototype.value = function(){
    if(!this.valid){
        this._value = this.calculate();
    }
    return this._value;
}