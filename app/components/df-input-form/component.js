/**
 * Created by gordan on 05.05.16..
 */

module.exports = {

    template: require('./df-input-form.html'),
    controller: require('./controller'),
    bindings: {
        definition: '<',
        saveClicked: '&onSaveClicked',
        item: '<'
    }

};