/**
 * Created by gordan on 17.04.16..
 */

module.exports = {
    template: require('./df-table-view.html'),
    bindings: {
        title:'@',
        items:'<',
        tableView:'<',
        selectedItemsChanged:'&onSelectedItemsChanged'
    },
    controller: 'dfTableViewController'
};