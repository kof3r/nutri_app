/**
 * Created by gordan on 17.04.16..
 */

module.exports = ['$scope', '$filter', function($scope, $filter){

    const columns = $scope.columns = this.columns.columns;

    $scope.items = this.items;
    $scope.selected = [];

    $scope.$watchCollection('selected', () => {
        this.selectedItemsChanged({items: $scope.selected});
    });

    $scope.$watchCollection('items', () => {
        $scope.selected.splice(0);
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