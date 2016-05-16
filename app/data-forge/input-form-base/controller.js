/**
 * Created by gordan on 05.05.16..
 */

module.exports = [
    '$scope', function($scope) {

    const self = this;

    $scope.fields = angular.copy(self.fields);
    $scope.resolves = {};
    resolvePromises();

    $scope.$watch(() => self.item, copyItem);
        
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
        $scope.item = {};
        if(self.item){
            angular.copy(self.item, $scope.item);
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