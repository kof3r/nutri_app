/**
 * Created by gordan on 02.06.16..
 */

module.exports = function(req, res, next) {

    const errors = require('../../../../bridge/validate')(req.body, require('../../../../bridge/validation-schemes/recipeIngredient'));

    if(errors.length > 0) {
        return next({ status: 400, message: errors });
    }
    next();

};