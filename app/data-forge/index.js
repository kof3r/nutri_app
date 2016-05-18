/**
 * Created by gordan on 10.04.16..
 */

const name = 'dataForge';

const dataForge = angular.module(name, []);

dataForge.factory('formFields', require('./form-fields'));
dataForge.factory('tableColumn', require('./table-column'));

dataForge.directive('dfLinker', require('./df-linker'));

dataForge.component('inputFormBase', require('./input-form-base'));
dataForge.component('tableViewBase', require('./table-view-base'));
dataForge.component('dfTableView', require('./df-table-view'));
dataForge.component('dfInputForm', require('./df-input-form'));
dataForge.component('dfAutocomplete', require('./df-autocomplete'));

module.exports = name;