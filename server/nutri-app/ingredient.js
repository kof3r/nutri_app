/**
 * Created by gordan on 17.05.16..
 */

const NotFound = require('../errors/not-found');

const Ingredient = require('../services/nutriapp-db').model('Ingredient');

const router = require('../generic/handler')(
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

module.exports = router;