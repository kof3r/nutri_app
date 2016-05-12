/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', '$timeout', function($scope, $timeout) {
    
    const self = this;

    $scope.items = [];
    $scope.deleteDisabled = true;
    let query = {};

    self.headItemsChanged = function(head, items) {
        if(items.length === 1) {
            compileQuery(head, items[0]);
            getAndSetItems();
        } else {
            $scope.items.splice(0);
        }
    };
    
    self.loadItems = function loadItems() {
        getAndSetItems();
    };
    
    $scope.selectedItemsChanged = function(items) {
        $scope.deleteDisabled = items.length === 0;
        self.linker.onSelectedItemsChanged(self.id, items);
    };
    
    self.$onInit = function() {
        self.linker.register(self.id, self, !self.foreignKeys ? null : Object.keys(self.foreignKeys));
        if(!self.foreignKeys) {
            self.loadItems();
        }
    };

    function compileQuery(head, related) {
        if(self.foreignKeys) {
            let keys = self.foreignKeys[head];
            for(let relatedKey in keys) {
                query[relatedKey] = related[keys[relatedKey]];
            }
        }
    }

    function getAndSetItems() {
        pend(self.service.get(query).then((items) => {
            angular.copy(items, $scope.items);
        }));
    }

    function pend(promise) {
        $scope.pending = true;
        promise.finally(() => $scope.pending = false);
        return promise;
    }
    
}];