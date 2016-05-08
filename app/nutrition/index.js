/**
 * Created by gordan on 10.04.16..
 */

const name = 'nutrition';

const nutrition = angular.module(name, []);

nutrition.factory('modelBase', require('./model-base'));
nutrition.factory('Ingredient', require('./ingredient'));
nutrition.factory('Recipe', require('./recipe'));

nutrition.value('calorieConstant', {
    perCarb: 4,
    perFat: 9,
    perProtein: 4
});

const filters = require('./filters');
nutrition.filter('energy', filters.energy);
nutrition.filter('mass', filters.mass);
nutrition.filter('volume', filters.volume);
nutrition.filter('quantity', filters.quantity);

module.exports = name;