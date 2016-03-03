/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('recipeManager')

    .component('recipeListView', {
        templateUrl:'recipe-manager/recipe-list-view/recipe-list-view.html',
        bindings:{
            title:'@',
            class:'@',
            data:'@',
            items:'<',
            selectedItems:'<',
            onSelect:'&',
            onDeselect:'&',
            onDeleteSelected:'&',
            deselectAllOn:'@'
        },
        controller: ['$scope', 'orderByFilter', 'filterFilter', 'tableColumns', controller]
    });

function controller($scope, orderBy, filter, tableColumns){
    var ctrl = this;

    this.$onInit = function(){
        var selected = $scope.selected = Object.create(null);

        var columns = $scope.columns = tableColumns[ctrl.data];

        $scope.$on(ctrl.deselectAllOn, deselectAllRecipes);

        $scope.items = function(){
            return orderBy(filter(ctrl.items, $scope.searchCriteria), $scope.orderCriteria);
        }

        $scope.displayItem = function(item, p){
            var value = columns[p].function ? item[p]() : item[p];
            value = columns[p].filter ? columns[p].filter(value) : value;
            return value;
        }

        $scope.$watchCollection(function() { return ctrl.selectedItems}, refreshView);

        $scope.$watchCollection(function() { return $scope.items()}, refreshView);

        $scope.$watch(function() { return $scope.searchCriteria; }, deselectAllRecipes);

        $scope.handleDeleteClick = function(){
            ctrl.onDeleteSelected();
        }

        $scope.handleSelectAllClick = function(){
            selectAll();
        }

        $scope.handleDeselectAllClick = function(){
            deselectAllRecipes();
        }

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

        $scope.handleKeyDown = function($event){
            switch ($event.which){
                case 46:{   //DELETE
                    ctrl.onDeleteSelected();
                    break;
                }
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