/**
 * Created by gordan on 10.04.16..
 */

// TODO: depovi

const name = 'recipeManager'

const recipeManager = require('angular').module(name, [
    require('../server'),
    require('../util'),
    require('../data-forge'),
    require('../nutrition')
]);

recipeManager.factory('ingredientDetailView', require('./ingredient-detail-view'));
recipeManager.factory('ingredientTableView', require('./ingredient-table-view'));
recipeManager.factory('recipeDetailView', require('./recipe-detail-view'));
recipeManager.factory('recipeTableView', require('./recipe-table-view'));
recipeManager.component('recipeManager', require('./recipe-manager'));

module.exports = name;