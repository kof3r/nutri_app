/**
 * Created by ggrab on 25.2.2016..
 */

angular.module('packer', ['nutrition'])

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

    .factory('packer', ['mapProperties', 'Recipe', 'Ingredient', function(mapProperties, Recipe, Ingredient){

        var dummies = {
            recipe: new Recipe(),
            ingredient: new Ingredient()
        }

        function _pack(domain, include, dummy){
            var dto = Object.create(null);
            for(var p in domain){
                if(typeof dummy[p] === 'undefined' || (include && include.indexOf(p) !== -1)){
                    dto[p] = domain[p];
                }
            }
            return dto;
        }

        function packRecipe(domain, include){
            console.log(domain);
            var dto =_pack(domain, include, dummies.recipe);
            if(dto.ingredients){
                dto.ingredients = dto.ingredients.map(function(ingredient){ return _pack(ingredient, null, dummies.ingredient) });
            }
            console.log(dto);
            return dto;
        }

        function packIngredient(domain, include){
            return _pack(domain, include, dummies.ingredient)
        }

        function _unpack(dto, Type){
            var instance = new Type();
            for(var p in dto){
                instance[p] = dto[p];
            }
            return instance;
        }

        function unpackRecipe(dto){
            var recipe = _unpack(dto, Recipe);
            if(recipe.ingredients && recipe.ingredients.length !== 0){
                recipe.ingredients = recipe.ingredients.map(function(dto){ return unpackIngredient(dto); });
            }
            return recipe;
        }

        function unpackIngredient(dto){
            return _unpack(dto, Ingredient);
        }

        return {

            mapRecipe: function(data){
                if(data.constructor === Array){
                    return data.map(function(dto){
                        return unpackRecipe(dto);
                    })
                }
                return unpackRecipe(data);
            },

            mapIngredient: unpackIngredient,

            packRecipe: packRecipe,

            unpackRecipe: unpackRecipe
        }
    }])
