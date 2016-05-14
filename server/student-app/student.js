/**
 * Created by gordan on 13.05.16..
 */

const Student = require('../services/students-db/index').model('Student');

module.exports = require('../generic/handler')(
    Student,
    (req) => { return { where: req.query.query } },
    (req) => { return { where: { id: req.body.id } } },
    (req) => { return { where: { id: req.query.id } } }  
);