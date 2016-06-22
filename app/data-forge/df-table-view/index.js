/**
 * Created by gordan on 11-May-16.
 */

module.exports = {
    template: require('./template.html'),
    controller: require('./controller'),
    bindings: {
        title: '@',
        columns: '<',
        id: '@',
        heads: '<',
        fetchStrategy: '<',
        deleteStrategy: '<'
    },
    require: {
        linker: '^^dfLinker'
    }
};