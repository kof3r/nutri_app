/**
 * Created by gordan on 11-May-16.
 */

const name = 'dfTableView';

angular.module(name, ['dataForge'])
    .component('dfTableView', require('./component'));

module.exports = name;