/**
 * Created by gordan on 11-May-16.
 */

const name = 'dfInputForm';

angular.module(name, ['dataForge'])
    .component('dfInputForm', require('./component'));

module.exports = name;