/**
 * Created by ggrab on 29.2.2016..
 */

module.exports = {

        templateUrl:'templates/detail-view.html',
        bindings:{
            title:'@',
            detailView:'@',
            modelName:'@',
            item:'<',
            onEnablingInput:'&',
            onDisablingInput:'&',
            submitItem:'&onSaveClick',
            cancelInputOn:'@',
            enableInputOn:'@'

        },
        controller: require('./detail-view-controller')

};