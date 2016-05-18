/**
 * Created by gordan on 17.05.16..
 */

const Sequelize = require('sequelize');

const nutrition = new Sequelize('postgres://nutriapp:nutriap@localhost:5432/nutrition');

const Recipe = nutrition.define('Recipe', require('./recipe'));

const Ingredient = nutrition.define('Ingredient', require('./ingredient'));

const RecipeIngredient = nutrition.define('RecipeIngredient', require('./recipe-ingredient'));

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });

Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

nutrition.sync();

module.exports = nutrition;