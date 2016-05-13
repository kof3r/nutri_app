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

    if(self.foreignKeys) {
        for(let head in self.foreignKeys) {
            let keys = self.foreignKeys[head];
            for(let relatedKey in keys) {
                query[relatedKey] = [];
            }
        }
    }

    self.headItemsChanged = function(head, items) {
        compileQuery(head, items);
        getAndSetItems();
    };
    
    self.loadItems = function loadItems() {
        getAndSetItems();
    };

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
        self.linker.register(self.id, self, !self.foreignKeys ? null : Object.keys(self.foreignKeys));
        if(!self.foreignKeys) {
            getAndSetItems();
        }
    };

    function compileQuery(head, items) {
        if(self.foreignKeys) {
            clearQueryForHead(head);
            let keys = self.foreignKeys[head];
            for(let relatedKey in keys) {
                items.forEach((i) => query[relatedKey].push(i[keys[relatedKey]]));
            }
        }
    }

    function getAndSetItems() {
        pend(self.fetchStrategy(query).then((items) => {
            angular.copy(items, $scope.items);
        }));
    }

    function clearQueryForHead(head) {
        for(let relatedKey in self.foreignKeys[head]) {
            query[relatedKey].splice(0);
        }
    }

    function pend(promise) {
        $scope.pending.push(promise);
        promise.finally(() => $scope.pending.pop());
        return promise;
    }
    
}];