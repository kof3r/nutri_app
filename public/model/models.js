/**
 * Created by ggrab on 25.2.2016..
 */

angular.module('models', [])
    .factory('modelBase', function(){

        function Base(){ }

        Base.prototype.dirty = false;

        Base.prototype.set = function(property, value){
            this[property] = value;
            this.dirty = true;
        };

        Base.prototype.isModified = function(){
            return this.dirty;
        };

        return Base;

    })
