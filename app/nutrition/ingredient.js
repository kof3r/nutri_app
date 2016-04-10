/**
 * Created by ggrab on 27.2.2016..
 */

module.exports = ['modelBase', 'calorieConstant', function(Base, calConst){
        function Ingredient(){

            this.dirty = false;

        }

        Ingredient.prototype = new Base();

        function nominalAmount(){
            if(this.measure !== 'quantity'){
                return 100;
            } else {
                return 1;
            }
        }

        function nutrientAmount(nutrient){
            return this[nutrient] * this.amount / nominalAmount.call(this);
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

        Ingredient.prototype.caloriesNominal = caloriesNominal;

        Ingredient.prototype.totalCalories = function(){
            return caloriesNominal.call(this) * this.amount / nominalAmount.call(this);
        }

        return Ingredient;
}]