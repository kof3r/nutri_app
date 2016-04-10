/**
 * Created by gordan on 10.04.16..
 */

module.exports = function(){

    function TableColumn(){
        this.align = 'left';
    }

    TableColumn.prototype.withHeader = function(header){
        this.header = header;
        return this;
    }

    TableColumn.prototype.displayAs = function(filter){
        this.filter = filter;
        return this;
    }

    TableColumn.prototype.Self = function(reflect){
        this.reflect = reflect;
        return this;
    }

    TableColumn.prototype.alignTo = function(align){
        this.align = align;
        return this;
    }

    TableColumn.prototype.class = function(_class){
        this._class = _class;
        return this;
    }

    return TableColumn;

};
