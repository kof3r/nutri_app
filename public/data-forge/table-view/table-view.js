/**
 * Created by ggrab on 23.2.2016..
 */

//TODO: Promijeni ime u table-view
//TODO: Izvuci u framework
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
            deselectAllEvent:'@deselectAllOn',
            selectItemEvent:'@selectItemOn',
            newClick:'&onNewClick',
            editClick:'&onEditClick',
            deleteClick:'&onDeleteClick',
            syncClick:'&onSyncClick'
        },
        controller: ['$scope', 'dataForge', 'dataForge_util_resolveComparator', 'cache', 'selection', '$filter', controller]
    });

function controller($scope, dataForge, resolveComparator, Cache, Selection, $filter){
    var ctrl = this;

    this.$onInit = function(){

        var columns = $scope.columns = dataForge.tableViewDefinition(ctrl.tableView);
        var reverse = $scope.reverse = Object.create(null);

        //TODO: Malo uljepsaj ovo
        var cache = new Cache(function(){

            var p = $scope.orderCriteria;
            console.log(p, reverse[p]);
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

            $scope.$on(ctrl.deselectAllEvent, deselectAll);

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
            if(!$event.ctrlKey){
                deselectAll();
            }
            if(isSelected){
                deselectItem(item);
            } else {
                selectItem(item);
            }
        }

        $scope.handleRowDblClick = function(item){
            deselectAll();
            selectItem(item);
            $scope.$emit(ctrl.rowDblClickEvent);
        }

        $scope.handleHeaderClick = function(p){
            $scope.orderCriteria = p;
            $scope.reverse[p] = !$scope.reverse[p];
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
                align: columns[p].align ? columns[p].align : 'left'
            }
        }

        function handleSelectItem($event, item){
            selectItem(item);
        }

        function selectItem(item){
            selection.select(item);
            $scope.$emit(ctrl.itemSelectedEvent, item);
        }

        function deselectItem(item){
            selection.deselect(item);
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

    }

}