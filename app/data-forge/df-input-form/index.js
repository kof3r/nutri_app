/**
 * Created by gordan on 11-May-16.
 */

module.exports = {
    template: require('./template.html'),
    controller: require('./controller'),
    bindings: {
        title: '@',
        fields: '<',
        head: '@',
        id: '@',
        foreignKeys: '<',
        saveStrategy: '<'
    },
    require: {
        linker: '^^dfLinker'
    }
};