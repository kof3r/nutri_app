/**
 * Created by gordan on 13.05.16..
 */

const Student = require('../services/students-db/index').model('Student');

const router = require('../generic/handler')(
    Student,
    (req) => { return { where: { id: req.body.id } } },
    (req) => { return { where: { id: req.query.id } } }
);

router.get('/', function(req, res, next) {
    Student.findAll().then(students => {
        if(students) {
            res.json(students);
        } else {
            next({ status: 404, message: 'No students available.' });
        }
    });
});

module.exports = router;