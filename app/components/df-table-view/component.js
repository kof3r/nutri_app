/**
 * Created by gordan on 11-May-16.
 */

module.exports = {
    template: require('./template.html'),
    controller: require('./controller'),
    bindings: {
        columns: '<',
        head:'@',
        id: '@',
        key: '@',
        foreignKey: '<',
        service: '<'
    },
    require: {
        linker: '^^dfLinker'
    }
};