/**
 * Created by ggrab on 27.2.2016..
 */

angular.module('nutrition')

    .factory('Recipe', ['mapProperties', 'modelBase', 'Ingredient', function(mapProperties, Base, Ingredient){

        function Recipe(){

            this.dirty = false;
            this.ingredients = [];

        }

        Recipe.prototype = new Base();

        Recipe.prototype.addIngredient = function(ingredient){
            var i = this.ingredients.findIndex(function(e){ return e.id === ingredient.id; });
            console.log(this.ingredients);
            console.log(this.ingredients[i]);
            console.log(ingredient);
            if(i != -1){
                this.ingredients.splice(i, 1);
            }
            ingredient.recipe_id = this.id;
            this.ingredients.push(ingredient);
        }

        Recipe.prototype.removeIngredient = function(ingredient){
            var i = this.ingredients.findIndex(function (e) { return e.id === ingredient.id; });
            if(i != -1){
                this.ingredients.splice(i ,1);
            }
        }

        function sumIngredientsNutritionalAspect(nutritionalAspect){
            return this.ingredients.reduce(function (prev, curr) {
                return prev + (curr[nutritionalAspect] ? curr[nutritionalAspect]() : 0);
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