/**
 * Created by gordan on 10.04.16..
 */

module.exports = function(){

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

}