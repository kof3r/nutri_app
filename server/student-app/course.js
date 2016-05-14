/**
 * Created by gordan on 14.05.16..
 */

const Course = require('../services/students-db').model('Course');

console.log(Course);

module.exports = require('../generic/handler')(
    Course,
    (req) => { return { where: req.query.query } },
    (req) => { return { where: { id: req.body.id } } },
    (req) => { return { where: { id: req.query.id } } }
);