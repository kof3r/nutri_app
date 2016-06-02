/**
 * Created by gordan on 18.05.16..
 */

const nutritionDb = require('../../../services/nutriapp-db/index');
const Recipe = nutritionDb.model('Recipe');
const Ingredient = nutritionDb.model('Ingredient');
const RecipeIngredient = nutritionDb.model('RecipeIngredient');

const router = require('express').Router();

router.post('/', require('./recipe-ingredient-validate'));

require('../../../generic/handler')(
    router,
    RecipeIngredient,
    (req) => { return { where: { id: req.query.id } } },
    (req) => { return { where: { id: req.query.id } } }
);

router.get('/', function(req, res, next) {

    RecipeIngredient.findAll({
        where: { RecipeId: req.query.RecipeId },
        include: [
            {
                model: Ingredient,
                required: true
            }
        ]
    }).then(ingredients => {
        if(!ingredients) {
            return next(new NotFound('Could not find recipes.'));
        }
        res.json(ingredients);
    });

});

module.exports = router;