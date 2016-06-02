/**
 * Created by gordan on 17.05.16..
 */

const NotFound = require('../../../errors/not-found');

const Ingredient = require('../../../services/nutriapp-db/index').model('Ingredient');

const router = require('express').Router();

router.put('/', require('./ingredient-validate'));

router.post('/', require('./ingredient-validate'));

require('../../../generic/handler')(
    router,
    Ingredient,
    (req) => { return { where: { id: req.body.id } } },
    (req) => { return { where: { id: req.query.id } } }
);

router.get('/', function(req, res, next) {
    
   Ingredient.findAll().then(ingredients => {
       if(!ingredients) {
           return next(new NotFound('Ingredients were not found.'));
       }
       res.json(ingredients);
   });
    
});

router.get('/search', function(req, res, next) {
    
    Ingredient.findAll({ where: { name: { $iLike: `${req.query.name}%` } } }).then(ingredients => {
        if(!ingredients) {
            return next(new NotFound('Failed to find ingredients.'));
        }
        return res.json(ingredients);
    });
    
});

module.exports = router;