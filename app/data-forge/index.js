/**
 * Created by gordan on 10.04.16..
 */

const name = 'dataForge';

const dataForge = angular.module(name, []);

dataForge.factory('detailViewConstructor', require('./detail-view-constructor'));
dataForge.factory('formFieldConstructor', require('./form-field-constructor'));

dataForge.factory('tableViewConstructor', require('./table-view-constructor'));
dataForge.factory('tableColumnConstructor', require('./table-column-constructor'));

module.exports = name;