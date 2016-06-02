/**
 * Created by gordan on 01.06.16..
 */

'use strict';

module.exports = function validate(object, scheme) {
    
    const errors = [];
    const fields = scheme.fields;
    if(fields){
        for(let prop in fields) {
            var value = (object[prop] && object[prop] !== 0) ? object[prop] : (object[prop] === 0 ? 0 : '');
            console.log(`Testing ${prop} against \'${value}\', resolved from ${object[prop]}.`);
            fields[prop].forEach(v => {
                if(!v[0](value)) {
                    errors.push(v[1]);
                }
            })
        }
    }
    const constraints = scheme.constraints;
    if(constraints){
        for(let constraint in constraints) {
            if(!constraints[constraint][0](object)) {
                errors.push(constraints[constraint][1])
            }
        }
    }
    return errors;
};