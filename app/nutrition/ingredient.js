/**
 * Created by ggrab on 27.2.2016..
 */

module.exports = ['modelBase', 'calorieConstant', function(Base, calConst){

    class Ingredient extends Base{

        constructor(dto) {
            super(dto);
        }

        nominalAmount(){
            if(this.measure !== 'quantity'){
                return 100;
            } else {
                return 1;
            }
        }

        nutrientAmount(nutrient){
            return this[nutrient] * this.amount / this.nominalAmount();
        }

        totalCarbs(){
            return this.nutrientAmount('carbs');
        }

        totalFats(){
            return this.nutrientAmount('fats');
        }

        totalProtein(){
            return this.nutrientAmount('protein');
        }

        caloriesNominal(){
            return this.carbs * calConst.perCarb + this.fats* calConst.perFat + this.protein * calConst.perProtein;
        }

        totalCalories() {
            return this.caloriesNominal() * this.amount / this.nominalAmount();
        }

    }

    return Ingredient;

}];