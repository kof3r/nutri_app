/**
 * Created by ggrab on 23.2.2016..
 */

var Promise = require('bluebird');
var path = require('path');

var orm = require('./server/orm');
orm.setup(path.join(__dirname, 'server', 'models'));

var Recipe = orm.model('recipe');
var Ingredient = orm.model('ingredient');

console.log(Recipe);

Recipe.create({
    name:'Oatmeal',
    ingredients:[
        {name:'Oats'},
        {name:'Milk'}
    ]
}, {
    include: [Ingredient]
}).then(function(){
    return Recipe.find({name:'Oatmeal'})
}).then(function(recipe){
    console.log(recipe);
})