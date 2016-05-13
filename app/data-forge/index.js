/**
 * Created by gordan on 10.04.16..
 */

const name = 'dataForge';

const dataForge = angular.module(name, []);

dataForge.factory('formFields', require('./form-fields'));

dataForge.directive('dfLinker', require('./df-linker'));

dataForge.component('inputFormBase', require('./input-form-base'));
dataForge.component('tableViewBase', require('./table-view-base'));

dataForge.factory('tableViewConstructor', require('./table-view-constructor'));
dataForge.factory('tableColumnConstructor', require('./table-column-constructor'));

module.exports = name;