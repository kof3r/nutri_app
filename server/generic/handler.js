/**
 * Created by gordan on 14.05.16..
 */

module.exports = function(Model, postQueryStrategy, deleteQueryStrategy) {

    const router = require('express').Router();

    router.put('/', function(req, res, next) {

        Model.create(req.body).then((instance) => {
            if(instance) {
                return res.json(instance);
            } else {
                return next({ message: 'Failed to create entity.' });
            }
        }).catch((error) => next({ message: 'Failed to create entity.' }));

    });

    router.post('/', function(req, res, next) {

        Model.upsert(req.body, postQueryStrategy(req)).then((instance) => {
            if(instance) {
                res.json(instance);
            } else {
                res.json(req.body);
            }
        }).catch((error) => next(error));

    });

    router.delete('/', function(req, res, next) {
        Model.destroy(deleteQueryStrategy(req)).then((n) => {
            if(n) {
                return res.json(n);
            } else {
                return next({ message: 'Failed to delete entity.' });
            }
        }).catch((error) => next({ message: 'Failed to delete entity.' }));

    });

    return router;
};