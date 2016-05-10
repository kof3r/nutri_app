/**
 * Created by gordan on 08.05.16..
 */

module.exports = {
    template: require('./recipes.html'),
    controller: require('./controller'),
    bindings: {
        tableView: '<'
    }
};