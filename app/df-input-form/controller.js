/**
 * Created by gordan on 05.05.16..
 */

module.exports = ['$scope', '$injector', function($scope, $injector) {
    
    $scope.fields = $injector.get(this.definition).fields;
    $scope.item = {};

    $scope.$watch(() => this.item, () => {
        if(this.item){
            angular.copy(this.item, $scope.item);
        } else {
            $scope.item = {};
        }
    });
    
    $scope.handleSaveClick = () => {
        this.onSaveClicked({ item: $scope.item });
    };
    
    $scope.handleCancelClick = () => {
        this.onCancelClicked();
    };

    $scope.resolveFieldTemplate = (field) => {
        switch(field.type){
            case 'text':
                return 'text-input.html';
            break;
        }
    };
    
}];