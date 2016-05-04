/**
 * Created by gordan on 05.05.16..
 */

const name = 'dfInputForm';

angular.module(name, [])
    .component('dfInputForm', require('./component'))
    .controller('dfInputFormController', require('./controller'));

module.exports = name;