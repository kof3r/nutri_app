/**
 * Created by gordan on 10.04.16..
 */

const name = 'nutrition';

const nutrition = angular.module(name, [
    require('../settings')  //TODO
]);

nutrition.factory('modelBase', require('./model-base'));
nutrition.factory('Ingredient', require('./ingredient'));
nutrition.factory('Recipe', require('./recipe'));

nutrition.value('calorieConstant', {
    perCarb: 4,
    perFat: 9,
    perProtein: 4
})

nutrition.filter('energy', ['settingsUnitsEnergy', function(setting) {
    return function(value){
        return value.toFixed(0) + ' ' + setting.value();
    }
}])

nutrition.filter('mass', ['settingsUnitsMass', function(setting){
    return function(value){
        return value.toFixed(1) + ' ' + setting.value();
    }
}])

nutrition.filter('volume', ['settingsUnitsVolume', function(setting){
    return function(value){
        return value.toFixed(1) + ' ' + setting.value();
    }
}])

nutrition.filter('quantity', function(){
    return function(value){
        return value.toFixed(0);
    }
});

module.exports = name;