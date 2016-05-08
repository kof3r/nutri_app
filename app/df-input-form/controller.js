/**
 * Created by gordan on 05.05.16..
 */

module.exports = [
    '$scope',
    '$stateParams',
    '$state', function($scope, $params, $state) {
    
    $scope.fields = this.definition.fields;
        
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

    $scope.resolveFieldTemplate = (field) => {
        switch(field.type){
            case 'text':
                return 'text-input.html';
                break;
        }
    };
    
}];