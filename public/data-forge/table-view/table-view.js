/**
 * Created by ggrab on 23.2.2016..
 */

//TODO: Sortiranje i indikatori
//TODO: Kada komponenta dobije fokus neka okine SelectedItemsChangedEvent

angular.module('dataForge')

    .component('tableView', {
        templateUrl:'data-forge/table-view/table-view.html',
        bindings:{
            title:'@',
            tableView:'@',
            items:'<',
            itemSelectedEvent:'@onItemSelectedEmit',
            itemDeselectedEvent:'@onItemDeselectedEmit',
            selectedItemsChangedEvent:'@onSelectedItemsChangedEmit',
            rowDblClickEvent:'@onRowDblClickEmit',
            resetEvent:'@resetOn',
            selectItemEvent:'@selectItemOn',
            newClick:'&onNewClick',
            editClick:'&onEditClick',
            deleteClick:'&onDeleteClick',
            syncClick:'&onSyncClick'
        },
        controller: ['$scope', 'dataForge_registry','dataForge_util_resolveComparator', 'cache', 'selection', '$filter', controller]
    });

function controller($scope, registry, resolveComparator, Cache, Selection, $filter){
    var ctrl = this;

    this.$onInit = function(){

        var columns = $scope.columns = registry.tableViewDefinition(ctrl.tableView);
        var reverse = $scope.reverse = Object.create(null);
        var lastTouchedItem;
        var lastSelectedItem;
        var keysPressed = Object.create(null);

        var cache = new Cache(function(){
            var p = $scope.orderCriteria;
            if(ctrl.items && p && ctrl.items.length > 0){
                return ctrl.items.slice(0, ctrl.items.length).sort(resolveComparator(ctrl.items[0], p, reverse[p]));
            }
            return ctrl.items.slice(0, ctrl.items.length);
        });

        var selection = new Selection();

        (function registerWatches(){

            $scope.$watch('orderCriteria', handleOrderCriteriaChanged);

            function handleOrderCriteriaChanged(){
                cache.invalidate();
            }

            $scope.$watch('reverse', function handleReverseChanged(){
                cache.invalidate();
            }, true)


            $scope.$watchCollection('$ctrl.items', handleItemsCollectionChanged);

            function handleItemsCollectionChanged() {
                deselectAll();
                cache.invalidate();
            }


            $scope.$watch('$ctrl.items', handleItemsChanged);

            function handleItemsChanged(){
                deselectAll();
                cache.invalidate();
            }
        })();

        (function wireEvents() {

            $scope.$on(ctrl.resetEvent, function reset(){
                deselectAll();
                lastTouchedItem = null;
            });

            $scope.$on(ctrl.selectItemEvent, handleSelectItem);

        })()

        $scope.items = function(){
            return cache.value();
        }

        $scope.displayItem = function(item, p){
            if(!item[p]) return null;
            var value = resolveValue(item, p);
            if(value !== value) return null;
            value = columns[p].filter ? $filter(columns[p].filter)(value) : value;
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
            var isSelected = selection.isSelected(item);
            if(!keysPressed[17] && !keysPressed[16]){   //  CTRL
                deselectAll();
            }
            if(keysPressed[16] && lastSelectedItem){    // SHIFT
                rangeSelect(item);
            } else {
                if(isSelected){
                    deselectItem(item);
                } else {
                    selectItem(item);
                }
            }
        }

        $scope.handleKeyDown = function($event){
            keysPressed[$event.which] = true;
            switch ($event.which){
                case 40:{
                    handleDownArrowKeyDown();
                    break;
                }
                case 38:{
                    handleUpArrowKeyDown();
                    break;
                }
            }
        }

        $scope.handleKeyUp = function ($event) {
            delete(keysPressed[$event.which]);
        }

        $scope.handleRowDblClick = function(item){
            deselectAll();
            selectItem(item);
            $scope.$emit(ctrl.rowDblClickEvent);
        }

        $scope.handleHeaderClick = function(p){
            if(p === $scope.orderCriteria){
                $scope.reverse[p] = !$scope.reverse[p];
            } else {
                $scope.reverse[p] = false;
            }
            $scope.orderCriteria = p;
        }

        $scope.whenRenderNewButton = function(){
            return selection.selected.length === 0;
        }

        $scope.whenRenderEditButton = function(){
            return selection.selected.length === 1;
        }

        $scope.whenRenderDeleteButton = function(){
            return selection.selected.length > 0;
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
            var cls = selection.isSelected(item) ? 'selected ' : '';
            cls += item.isNew() ? 'new' : item.isDirty() ? 'dirty' : '';
            return cls;
        }

        $scope.resolveCellStyle = function(p){
            return {
                'text-align': columns[p].align
            }
        }

        function handleSelectItem($event, item){
            selectItem(item);
        }

        function selectItem(item){
            selection.select(item);
            lastTouchedItem = item;
            lastSelectedItem = item;
            $scope.$emit(ctrl.itemSelectedEvent, item);
        }

        function deselectItem(item){
            selection.deselect(item);
            lastTouchedItem = item;
            lastSelectedItem = null;
            $scope.$emit(ctrl.itemDeselectedEvent, item);
        }

        function selectAll(){
            selection.selectAll(ctrl.items);
            $scope.$emit(ctrl.selectedItemsChangedEvent, selection.selected.slice(0, selection.selected.length));
        }

        function deselectAll(){
            selection.deselectAll();
            $scope.$emit(ctrl.selectedItemsChangedEvent, selection.selected.slice(0, selection.selected.length));
        }

        function handleDownArrowKeyDown(){
            handleArrowKey(true);
        }

        function handleUpArrowKeyDown(){
            handleArrowKey(false);
        }

        function handleArrowKey(down){
            var items = $scope.items();
            if(!lastTouchedItem){
                selectItem(items[0]);
            } else {
                var i = items.indexOf(lastTouchedItem);
                deselectAll();
                i = down ? (i + 1) : (i + items.length - 1);
                i %= items.length;
                selectItem(items[i]);
            }
        }

        function rangeSelect(item){
            var items = $scope.items();
            var lastSelectedIndex = items.indexOf(lastSelectedItem);
            var selectedIndex = items.indexOf(item);
            var diff = selectedIndex - lastSelectedIndex;
            var inc = diff / Math.abs(diff);
            for(var i = lastSelectedIndex; i != selectedIndex; i += inc){
                selectItem(items[i]);
            }
            selectItem(items[i]);
        }

    }

}