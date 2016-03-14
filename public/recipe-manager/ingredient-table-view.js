/**
 * Created by ggrab on 13.3.2016..
 */

angular.module('recipeManager')
    .factory('ingredientTableView', ['tableViewConstructor', 'tableColumnConstructor', function(TableView, TableColumn){

        return new TableView({
            // TableView postavke

            selectedRowClass: 'selected',
            rowClass: function() { return this.isNew() ? 'new' : this.isDirty() ? 'dirty' : ''}
        },{
            // Stupci TableView-a

            name: new TableColumn()
                .withHeader('Name')
                .class(function() { return this.caloriesNominal() > 400 ? 'highCal' : ''; }),

            amount: new TableColumn()
                .withHeader('Amount')
                .displayAs(function() { return this.measure; })
                .alignTo('right'),

            totalCalories: new TableColumn()
                .withHeader('Total calories')
                .displayAs('energy')
                .alignTo('right'),

            totalCarbs: new TableColumn()
                .withHeader('Total carbs')
                .displayAs('mass')
                .alignTo('right'),

            totalFats: new TableColumn()
                .withHeader('Total fats')
                .displayAs('mass')
                .alignTo('right')
                .class(function(){ return this.fats >= 15 ? 'highFat' : ''; }),

            totalProtein: new TableColumn()
                .withHeader('Total protein')
                .displayAs('mass')
                .alignTo('right')
                .class(function(){ return this.protein >= 15 ? 'highProtein' : ''; })

        });

    }])