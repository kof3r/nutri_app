/**
 * Created by gordan on 05.05.16..
 */

module.exports = [
    '$scope',
    '$stateParams',
    '$state', function($scope, $params, $state) {

    $scope.fields = angular.copy(this.definition.fields);
    resolvePromises();

    $scope.item = this.item;

    $scope.handleSaveClick = () => {
        let save;
        if($scope.item.id) {
            save = this.service.post($scope.item);
        } else {
            save = this.service.put($scope.item);
        }
        save.then(() => {
            $state.go(this.redirect);
        })
    };

    $scope.handleCancelClick = () => {
        $state.go(this.redirect);
    };

    function resolvePromises() {
        for(let prop in $scope.fields) {
            let field = $scope.fields[prop];
            if(field.resolve) {
                field.resolve();
            }
        }
    }
    
}];