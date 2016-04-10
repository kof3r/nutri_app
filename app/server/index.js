/**
 * Created by gordan on 10.04.16..
 */

const name = 'server';

const server = require('angular').module(name, [
    require('../util'),
    require('../nutrition')
]);

server.config(function(){
    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
});
server.factory('serverService', require('./server-service'));
server.factory('serverRecipeService', require('./server-recipe-service'));
server.factory('serverIngredientService', require('./server-ingredient-service'));

server.factory('packer', require('./packer'));
server.factory('ingredientPacker', ['packer', 'Ingredient', function(Packer, Ingredient){
    return new Packer(Ingredient);
}])
server.factory('recipePacker', ['packer', 'Recipe', 'ingredientPacker', function(Packer, Recipe, ingredientPacker){

    return new Packer(Recipe, {
        ingredients: function(entity) { }
    },{
        ingredients: function(dto) {
            this.ingredients = dto.ingredients.map(ingredientPacker.unpack.bind(ingredientPacker));
        }
    });
}])

module.exports = name;