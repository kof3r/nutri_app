/**
 * Created by gordan on 18.05.16..
 */

module.exports = {
    template: require('./template.html'),
    controller: require('./controller'),
    bindings: {
        item: '<',
        getStrategy: '<',
        placeholder: '@',
        displayProperty: '@',
        onSelectedItemChanged: '&'
    }
};