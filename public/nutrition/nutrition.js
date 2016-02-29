/**
 * Created by ggrab on 21.2.2016..
 */

angular.module('nutrition', ['converter', 'models', 'settings'])

    .value('calorieConstant', {
        perCarb: 4,
        perFat: 9,
        perProtein: 4
    })

    .filter('energy', ['settingsUnitsEnergy', function(setting) {
        return function(value){
            return value.toFixed(0) + ' ' + setting.value();
        }
    }])
    .filter('mass', ['settingsUnitsMass', function(setting){
        return function(value){
            return value.toFixed(0) + ' ' + setting.value();
        }
    }])
    .factory('filters', ['dateFilter', 'energyFilter', 'massFilter', function(date, energy, mass){
        return {
            date: date,
            energy: energy,
            mass: mass
        };
    }]);
