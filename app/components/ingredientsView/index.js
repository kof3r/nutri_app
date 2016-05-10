/**
 * Created by gordan on 08.05.16..
 */

module.exports = {
    template: require('./ingredients-view.html'),
    controller: require('./controller'),
    bindings: {
        recipes: '<',
        service: '<',
        tableView: '<'
    }
};