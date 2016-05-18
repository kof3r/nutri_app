/**
 * Created by gordan on 18.05.16..
 */

module.exports = ['$scope', function($scope) {
    
    const self = this;

    $scope.onSelectedItemChanged = function(item) {
        self.onSelectedItemChanged({ item: item });
    }
    
}];