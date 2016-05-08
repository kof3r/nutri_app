/**
 * Created by gordan on 17.04.16..
 */

module.exports = {
    templateUrl: 'templates/df-table-view.html',
    bindings: {
        title:'@',
        items:'<',
        tableView:'<',
        selectedItemsChanged:'&onSelectedItemsChanged'
    },
    controller: 'dfTableViewController'
};