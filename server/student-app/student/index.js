/**
 * Created by gordan on 13.05.16..
 */

const router = require('express').Router();
const Student = require('../../services/students-db').model('Student');

router.get('/', function(req, res, next) {

    const query = req.query.query;

    Student.findAll({ where: query }).then((students) => {
        if(students) {
            res.json(students);
        } else {
            next({ status: 404, message: 'Failed to retrieve students.' });
        }
    }).catch((error) => next({ message: 'Failed to retrieve students.' }));

});

router.put('/', function(req, res, next) {

    Student.create(req.body).then((student) => {
        if(student) {
            res.json(student);
        } else {
            next({ message: 'Failde to create student.' });
        }
    }).catch((error) => next({ message: 'Failed to create student.' }));

});

module.exports = router;