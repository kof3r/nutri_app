/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', '$q', function($scope, $q) {
    
    const self = this;

    $scope.items = [];
    $scope.selectedItems = [];
    $scope.deleteDisabled = true;
    $scope.pending = [];
    const headItems = {};

    if(self.heads){
        self.heads.forEach(h => headItems[h] = []);
    }

    self.headItemsChanged = function(head, items) {
        headItems[head] = items;
        getAndSetItems();
    };
    
    self.loadItems = function loadItems() {
        getAndSetItems();
    };

    // TODO: ukloni obrisane iz odabranih, neka deleteStrategy vrati proslijeđeni item
    $scope.deleteSelectedItems = function() {
        $q.all($scope.selectedItems.map(i => pend(self.deleteStrategy(i)))).finally(() => {
            getAndSetItems();
            self.linker.onItemsDeleted(self.id);
        });
    };
    
    $scope.selectedItemsChanged = function(items) {
        $scope.deleteDisabled = items.length === 0;
        angular.copy(items, $scope.selectedItems);
        self.linker.onSelectedItemsChanged(self.id, items);
    };
    
    self.$onInit = function() {
        self.linker.register(self.id, self, self.heads ? self.heads : null);
        if(!self.heads) {
            getAndSetItems();
        }
    };

    function getAndSetItems() {
        pend(self.fetchStrategy(headItems).then((items) => {
            angular.copy(items, $scope.items);
        }));
    }

    function pend(promise) {
        $scope.pending.push(promise);
        promise.finally(() => $scope.pending.pop());
        return promise;
    }
    
}];