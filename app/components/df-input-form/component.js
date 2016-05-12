/**
 * Created by gordan on 11-May-16.
 */

module.exports = {
    template: require('./template.html'),
    controller: require('./controller'),
    bindings: {
        fields: '<',
        head: '@',
        id: '@',
        key: '@',
        foreignKeys: '<',
        service: '<'
    },
    require: {
        linker: '^^dfLinker'
    }
};