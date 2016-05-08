/**
 * Created by ggrab on 13.3.2016..
 */

module.exports = ['tableViewConstructor', 'tableColumnConstructor', function(TableView, TableColumn){

        return new TableView({
            selectedRowClass: 'selected'
        },{
            name: new TableColumn().withHeader('Name'),
            totalCalories: new TableColumn().withHeader('Calories').displayAs('energy').alignTo('right')
        });

}];