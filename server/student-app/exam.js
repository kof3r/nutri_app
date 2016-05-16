/**
 * Created by gordan on 14.05.16..
 */

const Exam = require('../services/students-db').model('Exam');
const Student = require('../services/students-db').model('Student');

const router = require('../generic/handler')(
    Exam,
    (req) => { return JSON.parse(req.query.query) },
    (req) => { return { where: { StudentId: req.body.StudentId, CourseId: req.body.CourseId } } },
    (req) => { return { where: { id: req.query.id } } }
);

router.get('/withStudents', function(req, res, next) {
    const query = { where: {} };
    if(req.query.StudentId) {
        query.where.StudentId = req.query.StudentId;
    }
    if(req.query.CourseId) {
        query.where.CourseId = req.query.CourseId;
    }

    console.log(query);
    Exam.findAll(query).then(exams => {
        if(exams) {
            res.json(exams);
        } else {
            next({ status: 404, message: 'Specified exams were not found.'});
        }
    }).catch(error => {
        next({ message: 'Server error.' });
    });
});

module.exports = router;