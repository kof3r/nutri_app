/**
 * Created by gordan on 02.06.16..
 */

module.exports = function(req, res, next) {

    var errors = require('../../../../bridge/validate')(req.body, require('../../../../bridge/validation-schemes/student'));
    if(errors.length > 0) {
        process.nextTick(() => next({ status: 400, message: errors }));
    }
    process.nextTick(() => next());

};