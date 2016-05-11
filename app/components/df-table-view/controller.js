/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', function($scope) {
    
    const self = this;

    $scope.items = [];
    $scope.deleteDisabled = true;

    self.headItemsChanged = function(items) {
        if(items.length === 1) {
            pend(self.service.get(compileQuery(items[0])).then((items) => {
                $scope.items.splice(0);
                angular.copy(items, $scope.items);
            }));
        } else {
            $scope.items.splice(0);
        }
    };
    
    $scope.selectedItemsChanged = function(items) {
        $scope.deleteDisabled = items.length === 0;
        self.linker.onSelectedItemsChanged(self.id, items);
    };
    
    self.$onInit = function() {
        self.linker.register(self.id, self, self.head);
        if(!self.head) {
            pend(self.service.get().then(items => {
                angular.copy(items, $scope.items);
            }));
        }
    };

    function compileQuery(related) {
        const query = {};
        for(let relatedKey in self.foreignKey) {
            query[self.foreignKey[relatedKey]] = related[relatedKey];
        }
        return query;
    }

    function pend(promise) {
        $scope.pending = true;
        promise.then(() => $scope.pending = false);
    }
    
}];