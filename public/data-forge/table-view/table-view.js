/**
 * Created by ggrab on 23.2.2016..
 */

//TODO: Sortiranje i indikatori
//TODO: Kada komponenta dobije fokus neka okine SelectedItemsChangedEvent
//TODO: Cacheiraj stilove

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
            selectItemEvent:'@selectItemOn',

            resetEvent:'@resetOn',
            enableEvent:'@enableOn',
            disableEvent:'@disableOn',
            focusEvents:'@focusOn',

            newClick:'&onNewClick',
            editClick:'&onEditClick',
            deleteClick:'&onDeleteClick',
            syncClick:'&onSyncClick',
            onRowDblClick:'&',
            onDelKeyUp:'&'
        },
        controller: ['$injector', '$scope', 'dataForge_util_leftMap', 'dataForge_util_resolveComparator', 'cache', 'selection', '$filter', controller]
    });

function controller($injector, $scope, leftMap, resolveComparator, Cache, Selection, $filter){
    var ctrl = this;

    this.$onInit = function(){

        var tableView = angular.copy($injector.get(ctrl.tableView));
        var options = tableView.options;
        var columns = $scope.columns = tableView.columns;
        var reverse = $scope.reverse = Object.create(null);
        var lastTouchedItem;
        var lastSelectedItem;
        var keysPressed = Object.create(null);
        $scope.disabled = false;

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

            $scope.$on(ctrl.resetEvent, function handleReset(){
                deselectAll();
                lastTouchedItem = null;
                lastSelectedItem = null;
            });

            $scope.$on(ctrl.selectItemEvent, function handleSelectItem($event, item){
                selectItem(item);
            });

            $scope.$on(ctrl.enableEvent, function handleEnable(){
                $scope.disabled = false;
            });

            $scope.$on(ctrl.disableEvent, function handleDisable(){
                $scope.disabled = true;
            });

        })()

        $scope.items = function(){
            return cache.value();
        }

        $scope.resolveHeader = function(p){
            return sprintf('%s%s', columns[p].header, typeof reverse[p] === 'undefined' ? '' : reverse[p] ? '▼' : '▲');
        }

        $scope.resolveValue = function(item, p){
            if(!item[p]) return null;
            var value = resolveValue();
            if(value !== value) return null;
            var filter = resolveFilter();
            value = filter ? filter(value) : value;
            return value;

            function resolveValue(){
                if(columns[p].reflect){
                    console.log(columns[p].reflect)
                    return columns[p].reflect.call(item);
                } else if(item[p].constructor === Function){
                    return item[p]();
                }
                return item[p];
            }

            function resolveFilter(){
                var filter = columns[p].filter;
                if(filter){
                    if(isFunction(filter)){
                        filter = filter.call(item);
                    }
                    return $filter(filter);
                }
                return null;
            }
        }

        $scope.handleRowClick = function(item){
            var isSelected = selection.isSelected(item);
            if(!keysPressed[17] && !keysPressed[16]){   //  CTRL, SHIFT
                deselectAll();
            }
            if(keysPressed[16] && lastSelectedItem){    // SHIFT
                rangeSelect(lastSelectedItem, item);
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
                case 38:{
                    handleUpArrowKeyDown();
                    break;
                }
                case 40:{
                    handleDownArrowKeyDown();
                    break;
                }
            }
        }

        function handleDownArrowKeyDown(){
            handleArrowKey(true);
        }

        function handleUpArrowKeyDown(){
            handleArrowKey(false);
        }

        function handleArrowKey(down){
            var items = $scope.items();
            if(items.length === 0) return;
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

        $scope.handleKeyUp = function($event) {
            delete(keysPressed[$event.which]);

            switch($event.which){
                case 46:{
                    ctrl.onDelKeyUp();
                    break;
                }
            }
        }

        $scope.handleRowDblClick = function(item){
            deselectAll();
            selectItem(item);
            ctrl.onRowDblClick();
        }

        $scope.handleHeaderClick = function(p){
            if(p !== $scope.orderCriteria){
                delete($scope.reverse[$scope.orderCriteria])
            }
            $scope.reverse[p] = !$scope.reverse[p];
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

        $scope.resolveButtonStyle = function(){
            return $scope.disabled ? tableView.disabledButtonStyle : {};
        }

        $scope.resolveRowClass = function(item){
            var rowClassResolver = options.rowClass;
            var rowClass = '';
            if(rowClassResolver){
                if(typeof rowClassResolver === 'string'){
                    rowClass += rowClassResolver;
                } else {
                    rowClass += rowClassResolver.call(item);
                }
            }
            return selection.isSelected(item) ? (rowClass + ' ' + options.selectedRowClass) : rowClass;
        }

        $scope.resolveCellClass = function(item, p){
            var cellClass = options.cellClass ? (options.cellClass + ' ') : '';
            var cellClassResolver = columns[p]._class;
            if(cellClassResolver){
                if(typeof cellClassResolver === 'string'){
                    cellClass += cellClassResolver;
                }
                else {
                    cellClass += cellClassResolver.call(item);
                }
            }
            return cellClass;
        }

        $scope.resolveRowStyle = function(item){
            var style = {};
            if(item.isNew()){
                leftMap(style, tableView.newItemStyle);
            }
            if(item.isDirty()){
                leftMap(style, tableView.dirtyItemStyle);
            }
            return style;
        }

        $scope.resolveCellStyle = function(p){
            return {
                'text-align': columns[p].align
            }
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
            triggerSelecteditemsChanged()
        }

        function deselectAll(){
            selection.deselectAll();
            triggerSelecteditemsChanged();
        }

        function triggerSelecteditemsChanged(){
            $scope.$emit(ctrl.selectedItemsChangedEvent, selection.selected.slice(0, selection.selected.length));
        }

        function rangeSelect(from, to){
            var items = $scope.items();
            var lastSelectedIndex = items.indexOf(from);
            var selectedIndex = items.indexOf(to);
            var diff = selectedIndex - lastSelectedIndex;
            var inc = diff / Math.abs(diff);
            for(var i = lastSelectedIndex; i != selectedIndex; i += inc){
                selection.select(items[i]);
            }
            selection.select(items[i]);
            lastSelectedItem = items[i];
            triggerSelecteditemsChanged();
        }

        function isFunction(f){
            return angular.isFunction(f);
        }

    }

}