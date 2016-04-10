/**
 * Created by gordan on 10.04.16..
 */

module.exports = function(scope, events, handler){
    if(events.constructor === Array){
        events.forEach(function(event){
            scope.$on(event, handler);
        })
    } else{
        events.split(' ').forEach(function(event){
            scope.$on(event, handler);
        })
    }
}