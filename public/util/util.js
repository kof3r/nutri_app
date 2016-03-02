/**
 * Created by ggrab on 28.2.2016..
 */

angular.module('util', [])
    .value('util', {

        removeFromArray: function(array, item){
            var i = array.indexOf(item);
            if(i != -1){
                array.splice(i, 1);
            }
        },

        wireEvents: function(scope, events, handler){
            if(events.constructor === Array){
                events.forEach(function(event){
                    scope.$on(event, handler);
                })
            } else{
                scope.$on(events, handler);
            }
        }

    });
