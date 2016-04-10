/**
 * Created by ggrab on 28.2.2016..
 */

module.exports = {
    
    templateUrl:'templates/status-log.html',
    controller: ['$scope', 'messageQueue', function controller($scope, queue){

        this.$onInit = function(){
            var limit = 128;
            $scope.messages = [];

            queue.subscribe(addNewMessages);

            function addNewMessages(messages){
                messages.forEach(function(message){
                    $scope.messages.unshift(message);
                })
                $scope.messages.splice(limit);
            }
        }

    }]
}