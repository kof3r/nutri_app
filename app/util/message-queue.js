/**
 * Created by ggrab on 28.2.2016..
 */

module.exports = function(){

       function MessageQueue(){
            this._queue = [];
            this._subscribers = [];
        }

        MessageQueue.prototype.subscribe = function(callback){
            this._subscribers.push(callback);
        };

        MessageQueue.prototype._notify = function(){
            var queue = this;
            angular.forEach(queue._subscribers, function(callback){
                callback(queue._queue.slice());
            });
            this._queue = [];
        };
        
        MessageQueue.prototype.addMessages = function(messages){
            if(messages.constructor !== Array){
                var temp = [];
                temp.push(messages);
                messages = temp;
            }

            messages.forEach(function(message){
                this._queue.push({time: new Date(), message: message});
            }.bind(this));

            this._notify();
        };

        return new MessageQueue();
};