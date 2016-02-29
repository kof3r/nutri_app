/**
 * Created by ggrab on 23.2.2016..
 */

var orm = require('../orm');

var Recipe = orm.model('recipe');
var Ingredient = orm.model('ingredient');

var Response = require('../util/response');

var router = require('express').Router();

router.get('/', function(req, res){
    Recipe.findAll({
        include:{model: Ingredient, required:false}
    }).then(function(recipes){
        res.json(new Response(recipes, recipes ? null : 'Failed to retrieve recipes.'));
    })
});

router.put('/', function(req, res){
    var body = req.body;

    Recipe.create(body, {
        include: body.ingredients ? [ Ingredient ] : []
    }).then(function(recipe){
        res.json(new Response(recipe, recipe ? null : 'Failed to save recipe.'));
    }).catch(function(err){
        res.json(new Response());
    })
});

router.post('/', function(req, res){
    var body = req.body;

    Recipe.findById(body.id).then(function(recipe){
        if(recipe){
            console.log(recipe);
            return recipe.update(body);
        } else {
            return body;
        }
    }).then(function(recipe){
        if(recipe === body){
            res.json(new Response(body, 'Failed to update recipe.'));
        } else {
            res.json(new Response(recipe));
        }
    }).catch(function(err){
        res.json(new Response());
    })
})

router.delete('/:id', function(req, res){
    console.log(req.params.id);
    Recipe.findById(req.params.id).then(function(recipe){
        if(recipe){
            return recipe.destroy().then(function(recipe){
                res.json(new Response(recipe, recipe ? null : 'Failed to delete recipe.'))
            })
        } else{
            res.json(new Response(null, 'Recipe was not found.'))
        }
    })
});

module.exports = router;