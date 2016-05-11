/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', function($scope) {
    
    const self = this;

    $scope.items = [];

    self.headItemsChanged = function(items) {
        
    };
    
    $scope.selectedItemsChanged = function(items) {
        self.linker.onSelectedItemsChanged(self.id, items);
    };
    
    self.$onInit = function() {
        self.linker.register(self.id, self, self.head);
        self.service.get().then(items => {
            angular.copy(items, $scope.items);
        });
    };
    
}];