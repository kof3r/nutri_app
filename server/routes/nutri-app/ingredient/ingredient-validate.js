/**
 * Created by gordan on 02.06.16..
 */

const BadRequest = require('../../../errors/bad-request');

module.exports = function(req, res, next) {

    const errors = require('../../../../bridge/validate')(req.body, require('../../../../bridge/validation-schemes/ingredient'));

    if(errors.length > 0) {
        return process.nextTick(() => next(new BadRequest(errors)));
    }
    process.nextTick(() => next());

};