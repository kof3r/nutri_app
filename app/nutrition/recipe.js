/**
 * Created by ggrab on 27.2.2016..
 */

module.exports = ['modelBase', 'Ingredient', function(Base, Ingredient){

    class Recipe extends Base{

        constructor(dto){
            super(dto);
            if(this.ingredients){
                this.ingredients = this.ingredients.map((ingredient) => new Ingredient(ingredient))
            } else {
                this.ingredients = [];
            }
        }

        removeIngredient(ingredient){
            var i;
            if(ingredient.id){
                i = this.ingredients.findIndex((e) => e.id === ingredient.id);
            } else {
                i = this.ingredients.indexOf(ingredient);
            }
            if(i != -1){
                this.ingredients.splice(i ,1);
            }
        }

        addIngredient(ingredient){
            this.removeIngredient(ingredient);
            ingredient.recipe_id = this.id;
            this.ingredients.push(ingredient);
        }

        sumNutritionalAspect(aspect){
            return this.ingredients.reduce((prev, curr) =>  prev + (curr[aspect] ? curr[aspect]() : 0), 0);
        }

        totalCalories(){
            return this.sumNutritionalAspect('totalCalories');
        }

        totalCarbs(){
            return this.sumNutritionalAspect('totalCarbs');
        }

        totalFats(){
            return this.sumNutritionalAspect('totalFats');
        }

        totalProtein(){
            return this.sumNutritionalAspect('totalProtein');
        }

    }

    return Recipe;

}]