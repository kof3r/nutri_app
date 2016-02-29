var express = require('express');
var router = express.Router();

router.use('/recipe', require('./recipe'));

module.exports = router;
