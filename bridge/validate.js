/**
 * Created by gordan on 01.06.16..
 */

'use strict';

module.exports = function validate(object, scheme) {
    
    var errors = [];
    for(let prop in scheme) {
        var value = (object[prop] && object[prop] !== 0) ? object[prop] : (object[prop] === 0 ? 0 : '');
        console.log(`Testing ${scheme[prop][0]} against \'${value}\', resolved from ${object[prop]}.`);
        if(!scheme[prop][0].test(value)){
            errors.push(scheme[prop][1]);
        }
    }
    return errors;
};
