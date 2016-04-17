/**
 * Created by gordan on 17.04.16..
 */

module.exports = ['$scope', 'service', function($scope, service){

    $scope.items = [];
    var selected = [];
    $scope.item = null;

    service.get().then((items) => $scope.items = items);
    
    $scope.$watchCollection('selected', function handleSelectedItemChanged(){
        if(selected.length === 1){
            $scope.item = $scope.selected[0];
        }
    });
    
    $scope.save = function(item){
        return service.save(item).then((item) => addItem(item));
    };
    
    $scope.delete = function(item){
        return service.delete(item).then(() => removeItem(item));
    };
    
    $scope.onSelectedItemsChanged = function(items){
        selected = items;
    }

    function addItem(item){
        $scope.items.push(item);
    }

    function removeItem(item){
        const i = $scope.items.indexOf(item);
        if(i != -1) {
            $scope.splice(i, 1);
        }
    }

}]