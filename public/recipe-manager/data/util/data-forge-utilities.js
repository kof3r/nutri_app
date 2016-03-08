/**
 * Created by ggrab on 7.3.2016..
 */

angular.module('dataForgeUtilities', [])

    .factory('selection', function(){

        function Selection(){

            this.selected = [];

        }

        Selection.prototype.select = function(item){
            this.selected.push(item);
        }

        Selection.prototype.deselect = function(item){
            var i = this.selected.indexOf(item);
            if(i != -1){
                this.selected.splice(i, 1);
            }
        }

        Selection.prototype.isSelected = function(item){
            return this.selected.indexOf(item) !== -1;
        }

        Selection.prototype.selectAll = function(items){
            this.selected = items.slice(0, items.length);
        }

        Selection.prototype.deselectAll = function(){
            this.selected.splice(0, this.selected.length);
        }

        return Selection;

    })
    .factory('cache', function(){

        function Cache(calculate){
            this.valid = false;
            this.calculate = calculate;
        }

        Cache.prototype.invalidate = function(){
            this.valid = false;
        }

        Cache.prototype.value = function(){
            if(!this.valid){
                this._value = this.calculate();
            }
            return this._value;
        }

        return Cache;

    });