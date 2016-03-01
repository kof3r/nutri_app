/**
 * Created by ggrab on 1.3.2016..
 */

angular.module('recipeManager')
    .factory('formFields', ['recipeFormFields', function(recipe){
        return{
            recipe: recipe
        }
    }])

    .factory('recipeFormFields', ['filters', function(filters){
        return {
            name:{
                field: 'Name',
                type: 'text'
            },
            totalCalories:{
                field: 'Calories',
                function: true,
                filter: filters.energy
            },
            totalCarbs:{
                field: 'Carbohydrates',
                function: true,
                filter: filters.mass
            },
            totalFats:{
                field: 'Fats',
                function: true,
                filter: filters.mass
            },
            created_at:{
                field: 'Date created',
                filter: filters.date
            }
        }
    }]);
