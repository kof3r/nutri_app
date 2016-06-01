/**
 * Created by gordan on 01.06.16..
 */

module.exports = function validate(object, scheme) {
    
    var errors;
    for(let prop in scheme) {
        if(!scheme[prop][0].test(object[prop])){
            if(!errors) { errors = []; }
            errors.push(scheme[prop][1]);
        }
    }
    return errors;
};