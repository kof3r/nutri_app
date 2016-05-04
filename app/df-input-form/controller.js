/**
 * Created by gordan on 05.05.16..
 */

module.exports = ['$scope', '$injector', function($scope, $injector) {
    
    $scope.fields = $injector.get(this.definition);
    
}];