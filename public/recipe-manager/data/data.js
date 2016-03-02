/**
 * Created by ggrab on 2.3.2016..
 */

angular.module('data', ['nutrition'])

    .factory('filters', ['dateFilter', 'energyFilter', 'massFilter', function(date, energy, mass){
        return {
            date: date,
            energy: energy,
            mass: mass
        };
    }]);