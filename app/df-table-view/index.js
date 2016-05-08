/**
 * Created by gordan on 08.05.16..
 */

const name = 'dfTableView';

angular.module(name, [])
    .component('dfTableView', require('./component'))
    .controller('dfTableViewController', require('./controller'));

module.exports = name;