/**
 * Created by ggrab on 3.3.2016..
 */

function controller(){

    var ctrl = this;

}

angular.module('recipeManager')
    .component('controlPanel', {

        templateUrl:'recipe-manager/control-panel/control-panel.html',
        transclude: true,
        controller: controller

    });
