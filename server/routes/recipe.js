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

    Recipe.update(body, { where: { id: body.id } }).then(function(results){
        var n =  results[0];
        if(n !== 1){
            res.json(new Response(null, 'Failed to update ' + body.name + '.'));
        } else {
            res.json(new Response(body));
        }
    })
})

router.delete('/:id', function(req, res){
    var id = req.params.id;

    Recipe.destroy(id).then(function(n){
        if(n === 1){
            res.json(new Response());
        } else {
            res.json(new Response(null, 'Failed to delete recipe.'));
        }
    })
});

module.exports = router;