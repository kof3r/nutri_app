/**
 * Created by ggrab on 7.3.2016..
 */

angular.module('dataForge_util', [])

    .factory('selection', function(){

        function Selection(){

            this.selected = [];

        }

        Selection.prototype.select = function(item){
            var i = this.selected.indexOf(item);
            if(i === -1){
                this.selected.push(item);
            }
        }

        Selection.prototype.deselect = function(item){
            var i = this.selected.indexOf(item);
            if(i !== -1){
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

        Selection.prototype.count = function(){
            return this.selected.length;
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
                this.valid = true;
            }
            return this._value;
        }

        return Cache;

    })

    .constant('wireEvents', function(scope, events, handler){
            if(events.constructor === Array){
                events.forEach(function(event){
                    scope.$on(event, handler);
                })
            } else{
                events.split(' ').forEach(function(event){
                    scope.$on(event, handler);
                })
            }
        }
    )

    .constant('dataForge_util_resolveComparator', function(item, p, reverse){

        if(angular.isFunction(item[p])){
            return reverse ? reverseFuncarator : funcarator;
        } else {
            return reverse ? reverseComparator : comparator;
        }

        function funcarator(a, b){
            a = a[p](), b = b[p]();
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        }

        function reverseFuncarator(a, b){
            a = a[p](), b = b[p]();
            if(a < b) return 1;
            if(a > b) return -1;
            return 0;
        }

        function comparator(a, b){
            a = a[p], b = b[p];
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        }

        function reverseComparator(a, b){
            a = a[p], b = b[p];
            if(a < b) return 1;
            if(a > b) return -1;
            return 0;
        }
    });