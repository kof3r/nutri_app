/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', '$timeout', function($scope, $timeout) {
    
    const self = this;

    $scope.items = [];
    $scope.deleteDisabled = true;
    let query = {};

    self.headItemsChanged = function(items) {
        if(items.length === 1) {
            compileQuery(items[0]);
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
        self.linker.register(self.id, self, self.head);
        if(!self.head) {
            self.loadItems();
        }
    };

    function compileQuery(related) {
        query = {};
        for(let relatedKey in self.foreignKey) {
            query[self.foreignKey[relatedKey]] = related[relatedKey];
        };
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