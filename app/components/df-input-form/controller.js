/**
 * Created by gordan on 05.05.16..
 */

module.exports = [
    '$scope', function($scope) {

    const self = this;

    $scope.fields = angular.copy(self.definition.fields);
    resolvePromises();

    $scope.$watch(() => self.item, copyItem);
        
    $scope.handleSaveClick = function() {
        this.saveClicked($scope.item);
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
        for(let prop in $scope.fields) {
            let field = $scope.fields[prop];
            console.log(field)
            if(field.resolve) {
                field.resolve();
            }
        }
    }
    
}];