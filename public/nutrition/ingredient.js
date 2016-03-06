/**
 * Created by ggrab on 27.2.2016..
 */

angular.module('nutrition')

    //TODO: Odgovornost mapiranja bi trebalo maknut iz modela
    .factory('Ingredient', ['mapProperties', 'modelBase', 'calorieConstant', function(mapProperties, Base, calConst){
        function Ingredient(){

            this.dirty = false;

        }

        Ingredient.prototype = new Base();

        function nutrientAmount(nutrient){
            return this[nutrient] * this.amount / 100;
        }

        Ingredient.prototype.totalCarbs = function(){
            return nutrientAmount.call(this, 'carbs');
        }

        Ingredient.prototype.totalFats = function(){
            return nutrientAmount.call(this, 'fats');
        }

        Ingredient.prototype.totalProtein = function(){
            return nutrientAmount.call(this, 'protein');
        }

        function caloriesNominal(){
            return this.carbs * calConst.perCarb
                + this.fats* calConst.perFat
                + this.protein * calConst.perProtein;
        }

        Ingredient.prototype.totalCalories = function(){
            return caloriesNominal.call(this) * this.amount / 100;
        }

        return Ingredient;
    }]);

