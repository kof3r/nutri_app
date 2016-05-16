/**
 * Created by gordan on 05.05.16..
 */

module.exports = [
    '$scope', function($scope) {

    const self = this;

    $scope.fields = angular.copy(self.fields);
    $scope.resolves = {};
    resolvePromises();

    $scope.$watch(() => self.item, copyItem, true);
        
    $scope.handleSaveClick = function() {
        self.saveClicked({ item: $scope.item });
    };
        
    $scope.handleRevertClick = function() {
        copyItem();
    };

    $scope.isRevertDisabled = function() {
        return !self.item || angular.equals(self.item, $scope.item);
    };
        
    function copyItem() {
        if(self.item){
            $scope.item = angular.copy(self.item);
        } else {
            $scope.item = {};
        }
    }

    function resolvePromises() {
        self.fields.forEach(r => {
            r.forEach(f => {
                for(let prop in f) {
                    if(f[prop].resolve) {
                        f[prop].resolve().then((value) => {
                            $scope.resolves[prop] = value;
                        });
                    }
                }
            })
        })
    }
    
}];