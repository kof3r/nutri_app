/**
 * Created by gordan on 14.05.16..
 */

const Exam = require('../services/students-db').model('Exam');
const Student = require('../services/students-db').model('Student');
const Course = require('../services/students-db').model('Course');

const router = require('../generic/handler')(
    Exam,
    (req) => { return { where: { StudentId: req.body.StudentId, CourseId: req.body.CourseId } } },
    (req) => { return { where: { id: req.query.id } } }
);

router.get('/withStudents', function(req, res, next) {
    const query = { include: [ { model: Student }, { model: Course } ] };
    if(req.query.StudentId) {
        query.include[0].where = { id: req.query.StudentId };
    }
    if(req.query.CourseId) {
        query.include[1].where = { id: req.query.CourseId };
    }

    console.log(query);
    Exam.findAll(query).then(exams => {
        if(exams) {
            res.json(exams);
        } else {
            next({ status: 404, message: 'Specified exams were not found.'});
        }
    }).catch(error => {
        next({ message: error });
    });
});

module.exports = router;