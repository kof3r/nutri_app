/**
 * Created by gordan on 11-May-16.
 */

module.exports = ['$scope', function($scope) {

    const self = this;
    const foreignKeySet = new Set();
    for(let head in self.foreignKeys){
        let keys = self.foreignKeys[head];
        for(let key in keys) {
            foreignKeySet.add(key);
        }
    }
    
    $scope.item = {};

    // TODO: uvedi opcionalni FK, ? sintaksa
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
        constructItem();  // TODO: bug vezan uz gubljenje fk-eva nakon spremanja, ovdje pregaziš sve fk-eve
    };

    self.headItemsChanged = function(head, items) {
        constructItem();
        if(items.length === 1) {
            if(head === self.head) {
                angular.copy(items[0], $scope.item);
            } else if(self.foreignKeys && Object.keys(self.foreignKeys).indexOf(head) !== -1){
                let keys = self.foreignKeys[head];
                for(let foreignKey in keys) {
                    $scope.item[foreignKey] = items[0][keys[foreignKey]];
                }
            }
        } else {
            removeForeignKeys(head);
        }
    };

    self.$onInit = function () {
        let heads = self.foreignKeys ? Object.keys(self.foreignKeys) : [];
        heads = heads.concat(self.head);
        self.linker.register(self.id, self, heads);
    };

    function onItemSaved() {
        self.linker.reloadHeadItems(self.head);
    }

    function constructItem() {
        const item = {};
        for(let prop in $scope.item) {
            if(foreignKeySet.has(prop)) {
                item[prop] = $scope.item[prop];
            }
        }
        $scope.item = item;
    }

    function removeForeignKeys(head) {
        if(self.foreignKeys){
            for(let foreignKey in self.foreignKeys[head]) {
                delete $scope.item[foreignKey];
            }
        }
    }

}];