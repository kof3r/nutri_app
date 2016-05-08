/**
 * Created by gordan on 08.05.16..
 */

module.exports = {
    templateUrl: 'templates/ingredients-view.html',
    controller: require('./controller'),
    bindings: {
        recipes: '<',
        tableView: '<'
    }
};