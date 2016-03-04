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
            onSelect:'&',
            onDeselect:'&',
            onNewClick:'&',
            onEditClick:'&'
        },
        controller: ['$scope', 'orderByFilter', 'filterFilter', 'tableColumns', controller]
    });

function controller($scope, orderBy, filter, tableColumns){
    var ctrl = this;

    this.$onInit = function(){
        var selected = $scope.selected = Object.create(null);

        var columns = $scope.columns = tableColumns[ctrl.data];
        var itemsCache = {
            valid: false
        };

        $scope.$watch(function() { return $scope.orderCriteria;}, invalidate)

        $scope.$watch(function() { return $scope.searchCriteria;}, invalidate)

        $scope.$watchCollection(function() { return ctrl.items;}, invalidate)

        $scope.items = function(){
            if(!itemsCache.valid){
                itemsCache.items = orderBy(filter(ctrl.items, $scope.searchCriteria), $scope.orderCriteria);
                itemsCache.valid = true;
            }
            return itemsCache.items;
        }

        $scope.displayItem = function(item, p){
            if(!item[p]) return null;
            var value = item[p].constructor === Function ? item[p]() : item[p];
            value = columns[p].filter ? columns[p].filter(value) : value;
            return value;
        }

        $scope.$watchCollection(function() { return ctrl.selectedItems}, refreshView);

        $scope.$watchCollection(function() { return $scope.items()}, refreshView);

        $scope.$watch(function() { return $scope.searchCriteria; }, deselectAllRecipes);

        $scope.handleRowClick = function(item, index, $event){
            var isSelected = selected[index];
            if(!$event.ctrlKey){
                deselectAllRecipes();
            }
            if(isSelected){
                deselect(item);
            } else{
                select(item);
            }
        }

        $scope.handleHeaderClick = function(p){
            $scope.orderCriteria = p;
        }

        $scope.whenRenderEditButton = function(){
            ctrl.selectedItems.length === 1;
        }

        $scope.handleNewClick = function(){
            ctrl.onNewClick();
        }

        $scope.handleEditClick = function(){
            ctrl.onEditClick();
        }

        $scope.resolveRowClass = function(index){
            var cls = selected[index] ? 'selected ' : '';
            cls += $scope.items()[index].id ? '' : 'new';
            return cls;
        }

        function invalidate(newValue, oldValue){
            if(newValue !== oldValue){
                itemsCache.valid = false;
            }
        }

        function refreshView(){
            var items = $scope.items();
            var selectedItems = ctrl.selectedItems;

            for(var index in selected){
                delete(selected[index]);
            }

            angular.forEach(selectedItems, function(item){
                var index = items.indexOf(item);
                if(index != -1){
                    selected[index] = true;
                }
            })

        };

        function select(item){
            ctrl.onSelect({item: item});
        }

        function deselect(item){
            ctrl.onDeselect({item: item});
        }

        function deselectAllRecipes(){
            var items = ctrl.selectedItems.slice(0);
            angular.forEach(items, function(item){
                deselect(item);
            })
        }

        function selectAll(){
            var items = ctrl.items.slice(0);
            angular.forEach(items, function(item){
                select(item);
            })
        }

    }

}