/**
 * Created by gordan on 17.05.16..
 */

const nutritionDb = require('../services/nutriapp-db');
const NotFound = require('../errors/not-found');

const Recipe = nutritionDb.model('Recipe');
const Ingredient = nutritionDb.model('Ingredient');

const router = require('../generic/handler')(
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

router.get('/ingredients', function(req, res, next) {
    
    Recipe.findAll({ 
        where: { id: req.query.RecipeId },
        include: { 
            model: Ingredient,
            required: true
        }
    }).then(recipes => {
        if(!recipes) {
            return next(new NotFound('Could not find recipes.'));
        }
        res.json(recipes);
    });
    
});

module.exports = router;