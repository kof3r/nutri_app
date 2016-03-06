var express = require('express');
var router = express.Router();

router.use('/recipe', require('./recipe'));
router.use('/ingredient', require('./ingredient'));

module.exports = router;
