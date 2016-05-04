/**
 * Created by gordan on 05.05.16..
 */

module.exports = {

    templateUrl: 'templates/df-input-form.html',
    controller: 'dfInputFormController',
    bindings: {
        definition:'@',
        item: '<',
        onSaveClicked: '&',
        onCancelClicked: '&'
    }

};