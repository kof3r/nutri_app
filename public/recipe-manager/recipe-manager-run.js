/**
 * Created by ggrab on 9.3.2016..
 */

angular.module('recipeManager')

    .run(['dataForge', 'Recipe', 'Ingredient', function(dataForge, Recipe, Ingredient){

        dataForge.registerValidator('required', function(modelValue, viewValue){
            if(this.$isEmpty(modelValue)){
                return false;
            }
            return true;
        })

        dataForge.registerDataModel('recipe', Recipe);

        dataForge.registerDetailView('recipeDetailView', {

            name: dataForge.FormField().labelAs('Name').ofType('text').validate('required', 'Please provide a name for your recipe.'),
            totalCalories: dataForge.FormField().labelAs('Calories').displayAs('energy'),
            totalCarbs: dataForge.FormField().labelAs('Carbs').displayAs('mass'),
            totalFats: dataForge.FormField().labelAs('Fats').displayAs('mass'),
            totalProtein: dataForge.FormField().labelAs('Protein').displayAs('mass')

        });

        dataForge.registerTableView('recipeTableView', {

            name: dataForge.TableColumn().withHeader('Name'),
            totalCalories: dataForge.TableColumn().withHeader('Calories').displayAs('energy').alignTo('right')

        });

        dataForge.registerDataModel('ingredient', Ingredient);

        dataForge.registerDetailView('ingredientDetailView', {

            name: dataForge.FormField().labelAs('Name').ofType('text'),
            amount: dataForge.FormField().labelAs('Amount').ofType('number').withStep(0.1).displayAs('mass'),
            caloriesNominal: dataForge.FormField().labelAs('Nominal').displayAs('energy'),
            carbs: dataForge.FormField().labelAs('Carbs').ofType('number').withStep(0.1).displayAs('mass'),
            fats: dataForge.FormField().labelAs('Fats').ofType('number').withStep(0.1).displayAs('mass'),
            protein: dataForge.FormField().labelAs('Protein').ofType('number').withStep(0.1).displayAs('mass')

        });

        dataForge.registerTableView('ingredientTableView', {

            name: dataForge.TableColumn().withHeader('Name'),
            amount: dataForge.TableColumn().withHeader('Amount').displayAs('mass').alignTo('right'),
            totalCalories: dataForge.TableColumn().withHeader('Total calories').displayAs('energy').alignTo('right'),
            totalCarbs: dataForge.TableColumn().withHeader('Total carbs').displayAs('mass').alignTo('right'),
            totalFats: dataForge.TableColumn().withHeader('Fats').displayAs('mass').alignTo('right'),
            totalProtein: dataForge.TableColumn().withHeader('Protein').displayAs('mass').alignTo('right')

        });

    }])
