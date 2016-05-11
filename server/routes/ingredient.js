/**
 * Created by ggrab on 6.3.2016..
 */

var orm = require('../orm');

var Ingredient = orm.model('ingredient');

var Response = require('../util/response');

var router = require('express').Router();

router.get('/', function(req, res) {
    const query = JSON.parse(req.query.query);

    Ingredient.findAll({ where: query }).then(function(ingredients) {
        if(!ingredients) {
            res.json(new Response(null, 'Failed to retrieve ingredients.'));
        } else {
            res.json(new Response(ingredients));
        }
    }).catch(function(error) {
        res.json(new Response(null, 'Failed to retrieve ingredient.'));
    })
});

router.put('/', function(req, res){
    var body = req.body;

    Ingredient.create(body).then(function(ingredient){
        res.json(new Response(ingredient));
    }).catch(function(error){
        res.json(new Response(null, 'Failed to save ' + body.name + '.'));
    });
});

router.post('/', function(req, res){
    var body = req.body;

    Ingredient.update(body, { where: { id: body.id } }).then(function(results){
        if(results[0] === 1){
            res.json(new Response(body));
        } else {
            res.json(new Response(null, 'Failed to update ' + body.name + '.'));
        }
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;

    Ingredient.destroy({ where: { id: id } }).then(function(n){
        if(n === 1){
            res.json(new Response(n));
        } else {
            res.json(new Response(null, 'Failed to delete ingredient.'));
        }
    });
});


module.exports = router;