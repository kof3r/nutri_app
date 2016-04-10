/**
 * Created by gordan on 10.04.16..
 */

const name = 'dataForge_utilities';

const utilities = require('angular').module(name, []);

utilities.factory('selection', require('./selection'));
utilities.factory('cache', require('./cache'));
utilities.constant('wireEvents', require('./wire-events'));
utilities.constant('dataForge_util_resolveComparator', require('./resolve-comparator'));

module.exports = name;