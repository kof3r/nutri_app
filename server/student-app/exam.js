/**
 * Created by gordan on 14.05.16..
 */

const Exam = require('../services/students-db').model('Exam');

module.exports = require('../generic/handler')(
    Exam,
    (req) => { return { where: req.query.query } },
    (req) => { return { where: { StudentId: req.body.StudentId, CourseId: req.body.CourseId } } },
    (req) => { return { where: { id: req.query.id } } }
);