/**
 * Created by ggrab on 23.2.2016..
 */

angular.module('recipeManager')

    .component('recipeListView', {
        templateUrl:'recipe-manager/recipe-list-view/recipe-list-view.html',
        bindings:{
            columns:'<',
            items:'<',
            selectedItems:'<',
            onSelect:'&',
            onDeselect:'&',
            onDeleteKey:'&',
            searchCriteria: '<'
        },
        controller: ['$scope', 'orderByFilter', 'filterFilter', 'filters', controller]
    });

function controller($scope, orderBy, filter, filters){
    var ctrl = this;

    this.$onInit = function(){
        var selected = $scope.selected = Object.create(null);

        defineTable();

        $scope.items = function(){
            return orderBy(filter(ctrl.items, ctrl.searchCriteria), $scope.orderCriteria);
        }

        $scope.displayItem = function(item, column){
            var value = column.property ? item[column.property] : column.function ? item[column.function]() : '{!}';
            value = column.filter ? filters[column.filter](value) : value;
            return value;
        }

        $scope.$watchCollection(function() { return ctrl.selectedItems}, refreshView);

        $scope.$watchCollection(function() { return $scope.items()}, refreshView);

        $scope.$watch(function() { return ctrl.searchCriteria; }, deselectAll);

        $scope.handleRowClick = function(item, index, $event){
            var isSelected = selected[index];
            if(!$event.ctrlKey){
                deselectAll();
            }
            if(isSelected){
                deselect(item);
            } else{
                select(item);
            }
        }

        $scope.handleHeaderClick = function(column){
            $scope.headerClicks[column.property ? column.property : column.function]();
        }

        $scope.handleKeyDown = function($event){
            switch ($event.which){
                case 27:{   //ESC
                    deselectAll();
                    break;
                }
                case 46:{   //DELETE
                    ctrl.onDeleteKey();
                    break;
                }
            }
        }

        function defineTable(){
            selected = $scope.selected = Object.create(null);
            $scope.headerClicks = Object.create(null);

            ctrl.columns.forEach(function(d){
                var id = d.property ? d.property : d.function;
                $scope.headerClicks[id] = function(){
                    $scope.orderCriteria = id;
                }
            })
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
            ctrl.onSelect({recipe: item});
        }

        function deselect(item){
            ctrl.onDeselect({recipe: item});
        }

        function deselectAll(){
            var items = $scope.items();
            for(var index in selected){
                deselect(items[index]);
            }
        }

    }

}