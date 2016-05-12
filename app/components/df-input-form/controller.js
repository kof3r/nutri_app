/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', function($scope) {

    const self = this;
    const createStrategy = function(item) {
        self.service.put(item).then(onItemSaved);
    };
    const updateStrategy = function(item) {
        self.service.post(item).then(onItemSaved);
    };
    
    $scope.item = {};
    
    $scope.saveClicked = function(item) {
        if(item[self.key]) {
            updateStrategy(item);
        } else {
            createStrategy(item);
        }
    };

    self.headItemsChanged = function(items) {
        if(items.length === 1) {
            $scope.item = angular.copy(items[0]);
        } else {
            $scope.item = {};
        }
    };

    self.$onInit = function () {
        self.linker.register(self.id, self, self.head);
    };

    function onItemSaved(item) {
        self.linker.onItemSaved(self.head, item);
    }

}];
