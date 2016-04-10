/**
 * Created by ggrab on 13.3.2016..
 */

module.exports = function(){

        function DetailView(fields) {

            this.fields = angular.copy(fields);

        }

        return DetailView;

}