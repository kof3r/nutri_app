/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', function($scope) {

    const self = this;
    
    $scope.item = {};

    self.headItemsChanged = function(items) {
        if(items.length === 1) {
            $scope.item = angular.copy(items[0]);
        } else {
            $scope.item = {};
        }
    };

    self.$onInit = function () {
        self.linker.register(self.id, self, self.head);
    }

}];