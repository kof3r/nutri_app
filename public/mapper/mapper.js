/**
 * Created by ggrab on 25.2.2016..
 */

angular.module('mapper', ['nutrition'])

    .factory('mapProperties', function(){
        return function MapProperties(dto){

            for(var property in dto){
                if(this[property]){
                    throw new Error('Attempted to overwrite existing property.');
                }
                this[property] = dto[property];
            }

        }
    })

    .factory('mapper', ['mapProperties', 'Recipe', 'Ingredient', function(mapProperties, Recipe, Ingredient){

        function _map(dto, Type){
            var instance = new Type();
            mapProperties.call(instance, dto);
            return instance;
        }

        function mapRecipe(dto){
            var recipe = _map(dto, Recipe);
            if(recipe.ingredients && recipe.ingredients.length !== 0){
                var ingredients = recipe.ingredients.map(function(dto){ return mapIngredient(dto); });
                recipe.ingredients = ingredients;
            } else {
                recipe.ingredients = [];
            }
            return recipe;
        }

        function mapIngredient(dto){
            return _map(dto, Ingredient);
        }

        return {
            mapRecipe: function(data){
                if(data.constructor === Array){
                    return data.map(function(dto){
                        return mapRecipe(dto);
                    })
                }
                return mapRecipe(data);
            },

            mapIngredient: mapIngredient
        }
    }])
