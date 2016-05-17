/**
 * Created by gordan on 17.05.16..
 */

const router = require('express').Router();

router.use('/recipe', require('./recipe'));

router.use('/ingredient', require('./ingredient'));

module.exports = router;