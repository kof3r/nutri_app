/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', function($scope) {

    const self = this;
    const keys = self.foreignKeys;
    
    $scope.item = {};

    $scope.saveDisabled = function() {
        for(let head in self.foreignKeys) {
            for(let foreignKey in self.foreignKeys[head]) {
                if(!$scope.item.hasOwnProperty(foreignKey)) {
                    return true;
                }
            }
        }
        return false;
    };
    
    $scope.saveClicked = function(item) {
        self.saveStrategy(item).then(onItemSaved);
        $scope.item = {};
    };

    self.headItemsChanged = function(head, items) {
        $scope.item = {};
        if(items.length === 1) {
            if(head === self.head) {
                angular.copy(items[0], $scope.item);
            } else if(Object.keys(keys).indexOf(head) !== -1){
                let keys = self.foreignKeys[head];
                for(let foreignKey in keys) {
                    $scope.item[foreignKey] = items[0][keys[foreignKey]];
                }
            }
        }
    };

    self.$onInit = function () {
        let heads = self.foreignKeys ? Object.keys(self.foreignKeys) : [];
        heads = heads.concat(self.head);
        self.linker.register(self.id, self, heads);
    };

    function onItemSaved(item) {
        self.linker.onItemSaved(self.head, item);
    }

}];