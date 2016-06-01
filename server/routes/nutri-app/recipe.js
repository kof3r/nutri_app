/**
 * Created by gordan on 17.05.16..
 */

const nutritionDb = require('../../services/nutriapp-db');
const NotFound = require('../../errors/not-found');

const Recipe = nutritionDb.model('Recipe');
const Ingredient = nutritionDb.model('Ingredient');

const router = require('express').Router();

require('../../generic/handler')(
    router,
    Recipe,
    (req) => { return { where: { id: req.body.id } } },
    (req) => { return { where: { id: req.query.id } } }
);

router.get('/', function(req, res, next) {
    
    Recipe.findAll().then(recipes => {
        if(!recipes) {
            return next(new NotFound('Recipes not found.'));
        }
        res.json(recipes);
    });
    
});

router.use('/ingredients', require('./recipe-ingredient'));

module.exports = router;