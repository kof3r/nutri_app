/**
 * Created by gordan on 10.04.16..
 */

const name = 'util';

const util = require('angular').module(name, []);

util.value('util', require('./util'));
util.factory('messageQueue', require('./message-queue'));
util.filter('message', function(){
    return function (message){
        return sprintf('[%s]:\t%s', message.time.toLocaleTimeString(), message.message);
    }
});
util.component('statusLog', require('./status-log'));

module.exports = name;