/**
 * Created by gordan on 17.04.16..
 */

module.exports = ['$scope', '$filter', '$injector', function($scope, $filter, $injector){

    const tableView = $injector.get(this.tableView);
    const options = tableView.options;
    const columns = $scope.columns = tableView.columns;

    $scope.items = this.items;
    $scope.selected = [];

    $scope.$watchCollection('selected', () => {
        this.selectedItemsChanged({items: $scope.selected.slice()});
    });

    $scope.$watchCollection('items', () => {
        console.log('saw');
        $scope.selected.splice();
        this.selectedItemsChanged({items: $scope.selected.slice()});
    });

    $scope.resolveValue = function(item, p){
        if(!item[p]) return null;
        var value = resolveValue();
        if(value !== value) return null;
        var filter = resolveFilter();
        value = filter ? filter(value) : value;
        return value;

        function resolveValue(){
            if(columns[p].reflect){
                return columns[p].reflect.call(item);
            } else if(isFunction(item[p])){
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

    function isFunction(object) {
        return angular.isFunction(object);
    }
}];