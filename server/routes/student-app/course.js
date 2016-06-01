/**
 * Created by gordan on 14.05.16..
 */

const Course = require('../../services/students-db').model('Course');

const router = require('express').Router();

require('../../generic/handler')(
    router,
    Course,
    (req) => { return { where: { id: req.body.id } } },
    (req) => { return { where: { id: req.query.id } } }
);

router.get('/', function(req, res, next) {
    Course.findAll().then(courses => {
        if(courses) {
            res.json(courses);
        } else {
            next({ status: 404, message: 'No courses found.'});
        }
    });
});

module.exports = router;