/**
 * Created by ggrab on 2.3.2016..
 */

angular.module('data')
    .factory('ingredientListColumns', ['filters', function(filters){
        return {
            name:{
                header:'Name'
            },
            totalCalories:{
                header:'Calories',
                function:true,
                filter: filters.energy
            }
        }
    }])