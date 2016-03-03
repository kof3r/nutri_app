/**
 * Created by ggrab on 28.2.2016..
 */

angular.module('util', [])
    .value('util', {

        removeFromArray: function(array, item){
            var i = array.indexOf(item);
            if(i !== -1) array.splice(i, 1);
        },

        wireEvents: function(scope, events, handler){
            if(events.constructor === Array){
                events.forEach(function(event){
                    scope.$on(event, handler);
                })
            } else{
                scope.$on(events, handler);
            }
        },

        addToArray:function(source, destination){
            if(source.constructor === Array){
                source.forEach(function(i){
                    destination.push(i);
                })
            } else {
                destination.push(source);
            }
        }

    })

    .factory('selectionManager', ['util', function(util) {

        function SelectionManager($scope, items, selected){

            this.scope = $scope;
            this.items = items;
            this.selected = selected;

        }

        SelectionManager.prototype.add = function(item){
            this.scope[this.items].push(item);
        }

        SelectionManager.prototype.remove = function(item){
            this.deselect(item);
            util.removeFromArray(this.scope[this.items], item);
        }

        SelectionManager.prototype.removeAll = function(){
            this.deselectAll();
            this.scope[this.items].splice(0);
        }

        SelectionManager.prototype.select = function(item){
            if(this.scope[this.items].indexOf(item) === -1) throw new Error('Attempted to select non existing item.');

            this.scope[this.selected].push(item);
        }

        SelectionManager.prototype.deselect = function(item){
            util.removeFromArray(this.scope[this.selected], item);
        }

        SelectionManager.prototype.selectAll = function(){
            this.scope[this.selected] = this.scope[this.items].slice(0);
        }

        SelectionManager.prototype.deselectAll = function(){
            this.scope[this.selected].splice(0);
        }

        return SelectionManager;

    }]);
