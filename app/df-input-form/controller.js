/**
 * Created by gordan on 05.05.16..
 */

module.exports = [
    '$scope',
    '$stateParams',
    '$state',
    '_service',
    '_definition',
    '_redirect', function($scope, $params, $state, _service, _definition, _redirect) {
    
    $scope.fields = _definition.fields;
        
    if($params.id){
        _service.get($params.id).then((recipe) => {
            $scope.item = recipe;
        })
    } else {
        $scope.item = {};
    }
    
    $scope.handleSaveClick = () => {
        let save;
        if($scope.item.id) {
            save = _service.post($scope.item);
        } else {
            save = _service.put($scope.item);
        }
        save.then(() => {
            $state.go(_redirect);
        })
    };
    
    $scope.handleCancelClick = () => {
        $state.go(_redirect);
    };

    $scope.resolveFieldTemplate = (field) => {
        switch(field.type){
            case 'text':
                return 'text-input.html';
                break;
        }
    };
    
}];