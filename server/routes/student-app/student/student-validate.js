/**
 * Created by gordan on 02.06.16..
 */

const BadRequest = require('../../../errors/bad-request');

module.exports = function(req, res, next) {

    var errors = require('../../../../bridge/validate')(req.body, require('../../../../bridge/validation-schemes/student'));
    if(errors.length > 0) {
        process.nextTick(() => next(new BadRequest(errors)));
    }
    process.nextTick(() => next());

};