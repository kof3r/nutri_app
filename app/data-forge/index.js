/**
 * Created by gordan on 10.04.16..
 */

const name = 'dataForge';

const dataForge = require('angular').module(name, [require('./utilities')]);

dataForge.run(require('./data-forge-run'));

dataForge.factory('dataForge', require('./data-forge'));
dataForge.factory('dataForge_registry', require('./data-forge-registry'));

dataForge.component('detailView', require('./detail-view/detail-view'));
dataForge.factory('detailViewConstructor', require('./detail-view/detail-view-constructor'));
dataForge.factory('formFieldConstructor', require('./detail-view/form-field-constructor'));
dataForge.directive('validate', require('./detail-view/validate'));

dataForge.component('tableView', require('./table-view/table-view'));
dataForge.factory('tableViewConstructor', require('./table-view/table-view-constructor'));
dataForge.factory('tableColumnConstructor', require('./table-view/table-column-constructor'));

module.exports = name;
