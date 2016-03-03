/**
 * Created by ggrab on 23.2.2016..
 */

var Promise = require('bluebird');

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
            return Promise.all([
                Recipe.upsert(body),
                Promise.all(body.ingredients.map(function(ingredient){
                    if(!ingredient.recipe_id){
                        ingredient.recipe_id = body.id;
                    }
                    return Ingredient.upsert(ingredient);
                }))]
            );
        }
        throw new Error('Update of ' + body.name + ' failed.');
    }).then(function(){
        return Recipe.findById(body.id, {include: [Ingredient]})
    }).then(function(recipe){
        res.json(new Response(recipe));
    }).catch(function(err){
        res.json(new Response(null, err.message));
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