/**
 * Created by gordan on 14.05.16..
 */

const sequelize = require('../services/students-db');

module.exports = function(Model, getStrategy, postStrategy, deleteStrategy) {

    const router = require('express').Router();

    router.get('/', function(req, res, next) {

        const query = getStrategy(req);
        if(query.include) {
            query.include.forEach((i) => {
                i.model = sequelize.model(i.model);
            });
        }
        console.log(query);

        Model.findAll(query).then((instances) => {
            if(instances) {
                return res.json(instances);
            } else {
                return next({ status: 404, message: 'Failed to retrieve entities.' });
            }
        }).catch((error) => next({ message: 'Failed to retrieve entities.' }));

    });

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

        Model.update(req.body, postStrategy(req)).then((instance) => {
            if(instance) {
                res.json(instance);
            } else {
                next({ message: 'Failed to update entity.' });
            }
        }).catch((error) => next({ message: 'Failed to update entity.' }));

    });

    router.delete('/', function(req, res, next) {
        console.log(deleteStrategy(req));
        Model.destroy(deleteStrategy(req)).then((n) => {
            if(n) {
                return res.json(n);
            } else {
                return next({ message: 'Failed to delete entity.' });
            }
        }).catch((error) => next({ message: 'Failed to delete entity.' }));

    });

    return router;
};