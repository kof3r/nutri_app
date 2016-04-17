/**
 * Created by gordan on 17.04.16..
 */

module.exports = {
    templateUrl: 'templates/table-view-test.html',
    bindings: {
        items:'<',
        tableView:'@',
        selectedItemsChanged:'&onSelectedItemsChanged'
    },
    controller: require('./table-view-test-controller')
};