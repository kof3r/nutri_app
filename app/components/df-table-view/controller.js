/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', '$q', function($scope, $q) {
    
    const self = this;

    $scope.items = [];
    $scope.selectedItems = [];
    $scope.deleteDisabled = true;
    $scope.pending = [];
    let query = {};

    self.headItemsChanged = function(head, items) {
        compileQuery(head, items);
        if(items.length === 1) {
            getAndSetItems();
        } else {
            $scope.items.splice(0);
        }
    };
    
    self.loadItems = function loadItems() {
        getAndSetItems();
    };

    $scope.deleteSelectedItems = function() {
        console.log($scope.selectedItems);
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
        self.linker.register(self.id, self, !self.foreignKeys ? null : Object.keys(self.foreignKeys));
        if(!self.foreignKeys) {
            getAndSetItems();
        }
    };

    function compileQuery(head, items) {
        if(items.length === 1 && self.foreignKeys) {
            let related = items[0];
            let keys = self.foreignKeys[head];
            for(let relatedKey in keys) {
                query[relatedKey] = related[keys[relatedKey]];
            }
        } else {
            let keys = self.foreignKeys[head];
            for(let relatedKey in keys) {
                delete query[relatedKey];
            }
        }
    }

    function getAndSetItems() {
        pend(self.fetchStrategy(query).then((items) => {
            angular.copy(items, $scope.items);
        }));
    }

    function pend(promise) {
        $scope.pending.push(promise);
        promise.finally(() => $scope.pending.pop());
        return promise;
    }
    
}];