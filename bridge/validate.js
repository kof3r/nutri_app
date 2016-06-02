/**
 * Created by gordan on 01.06.16..
 */

'use strict';

module.exports = function validate(object, scheme) {
    
    var errors = [];
    for(let prop in scheme) {
        var value = (object[prop] && object[prop] !== 0) ? object[prop] : (object[prop] === 0 ? 0 : '');
        console.log(`Testing ${prop} against \'${value}\', resolved from ${object[prop]}.`);
        scheme[prop].forEach(v => {
            if(!v[0](value)) {
                errors.push(v[1]);
            }
        })
    }
    return errors;
};
