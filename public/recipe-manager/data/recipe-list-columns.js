/**
 * Created by ggrab on 2.3.2016..
 */

angular.module('data')
    .factory('recipeListColumns', ['filters', function(filters){
        return {
            name:{
                header:'Name'
            },
            created_at:{
                header: 'Date created',
                filter: filters.date
            }
        }
    }])