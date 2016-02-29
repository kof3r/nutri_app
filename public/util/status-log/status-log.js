/**
 * Created by ggrab on 28.2.2016..
 */

function controller($scope, queue){

    this.$onInit = function(){
        var limit = 128;
        $scope.messages = [];

        queue.subscribe(addNewMessages);

        function addNewMessages(messages){
            console.log(messages[0])
            messages.forEach(function(message){
                $scope.messages.unshift(message);
            })
            $scope.messages.splice(limit);
        }
    }

}

angular.module('util')
    .filter('message', function(){
        return function (message){
            return sprintf('[%s]:\t%s', message.time.toLocaleTimeString(), message.message);
        }
    })
    .component('statusLog', {
        templateUrl:'util/status-log/status-log.html',
        controller: ['$scope', 'messageQueue', controller]
    });
