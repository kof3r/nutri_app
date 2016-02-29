/**
 * Created by ggrab on 25.2.2016..
 */

angular.module('mapper', ['nutrition'])
    .factory('mapper', ['Recipe', function(Recipe){
        return {
            map: function(data){
                if(data.constructor === Array){
                    return data.map(function(dto){
                        return new Recipe(dto);
                    })
                }
                return new Recipe(data);
            }
        }
    }])
