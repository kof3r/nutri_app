/**
 * Created by ggrab on 27.2.2016..
 */

angular.module('nutrition')

    .factory('Recipe', ['mapProperties', 'modelBase', 'Ingredient', function(mapProperties, Base, Ingredient){

        function Recipe(recipe){ }

        Recipe.prototype = new Base();

        Recipe.prototype.isModified = function () {
            return Base.prototype.isModified.call(this) && !this.isNew();
        };

        Recipe.prototype.isNew = function () {
            return this.id === undefined;
        };

        function sumIngredientsNutritionalAspect(nutritionalAspect){
            return this.ingredients.reduce(function (prev, curr) {
                return prev + curr[nutritionalAspect]();
            }, 0);
        };

        Recipe.prototype.totalCalories = function(){
            return sumIngredientsNutritionalAspect.call(this, 'totalCalories');
        }

        Recipe.prototype.totalCarbs = function(){
            return sumIngredientsNutritionalAspect.call(this, 'totalCarbs');
        }

        Recipe.prototype.totalFats = function(){
            return sumIngredientsNutritionalAspect.call(this, 'totalFats');
        }

        Recipe.prototype.totalProtein = function(){
            return sumIngredientsNutritionalAspect.call(this, 'totalProtein');
        }

        return Recipe;

    }]);