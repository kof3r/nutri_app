/**
 * Created by gordan on 01.06.16..
 */

module.exports = ['$mdDialog', '$document', function($mdDialog, $document) {

    function alert(config) {
        return $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element($document.body))
                .clickOutsideToClose(config.clickOutsideToClose || true)
                .title(config.title)
                .textContent(config.text)
                .ok(config.ok || 'OK')
                .targetEvent(config.event)
        );
    }

    return {
        alert: alert
    };

}];