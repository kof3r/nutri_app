/**
 * Created by gordan on 17.04.16..
 */

module.exports = {
    template: require('./df-table-view.html'),
    controller: require('./controller'),
    bindings: {
        title:'@',
        items:'<',
        columns:'<',
        selectedItemsChanged:'&onSelectedItemsChanged'
    }
};