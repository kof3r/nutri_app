/**
 * Created by gordan on 13.05.16..
 */

const router = require('express').Router();

router.use('/student', require('./student'));

router.use('/course', require('./course'));

router.use('/exam', require('./exam'));

module.exports = router;