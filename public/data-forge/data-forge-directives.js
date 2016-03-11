/**
 * Created by ggrab on 11.3.2016..
 */

angular.module('dataForge_directives', ['dataForge_util'])
    .directive('dfFocusOn', ['wireEvents', function(wireEvents){
        return {
            restrict: 'A',
            scope:{
                dfFocusOn:'<'
            },
            link: function(scope, elem, attrs){

                attrs.$observe('dfFocusOn', function(){
                    if(scope.dfFocusOn){
                        console.log(scope.dfFocusOn);
                        wireEvents(scope, scope.dfFocusOn, function(){ elem[0].focus() });
                    }
                });


            }
        }
    }]);
